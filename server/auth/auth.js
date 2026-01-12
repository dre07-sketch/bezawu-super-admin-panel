// Authentication routes for admin panel
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../connection/db');
const { sendOTPEmail, sendPasswordResetSuccessEmail } = require('../utils/emailService');
const authMiddleware = require('../middleware/auth');


// In-memory storage for OTPs (will be cleared on server restart)
// Structure: { email: { otp: '123456', expiresAt: timestamp, adminId: 'uuid' } }
const otpStorage = new Map();

// Clean up expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStorage.entries()) {
        if (data.expiresAt < now) {
            otpStorage.delete(email);
        }
    }
}, 5 * 60 * 1000);

// Generate random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find admin by email
        const result = await query(
            'SELECT * FROM admins WHERE email = $1',
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const admin = result.rows[0];

        // Check if account is active
        if (!admin.is_active) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been deactivated. Please contact support.'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        await query(
            'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [admin.id]
        );

        // Generate JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                role: admin.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return success response
        res.json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                fullName: admin.full_name,
                role: admin.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
});

// POST /api/auth/forgot-password - Request password reset OTP
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find admin by email
        const result = await query(
            'SELECT id, email, full_name FROM admins WHERE email = $1',
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            // Don't reveal if email exists or not for security
            return res.json({
                success: true,
                message: 'If an account exists with this email, an OTP has been sent.'
            });
        }

        const admin = result.rows[0];

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store OTP in memory (overwrites any existing OTP for this email)
        otpStorage.set(email.toLowerCase(), {
            otp,
            expiresAt,
            adminId: admin.id
        });

        // Send OTP email
        await sendOTPEmail(admin.email, otp, admin.full_name);

        res.json({
            success: true,
            message: 'OTP has been sent to your email address'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
});

// POST /api/auth/verify-otp - Verify OTP code
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Validate input
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const emailLower = email.toLowerCase();
        const storedData = otpStorage.get(emailLower);

        // Check if OTP exists and is valid
        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Check if OTP has expired
        if (storedData.expiresAt < Date.now()) {
            otpStorage.delete(emailLower);
            return res.status(400).json({
                success: false,
                message: 'OTP has expired'
            });
        }

        // Verify OTP
        if (storedData.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        // Generate a temporary token for password reset
        const resetToken = jwt.sign(
            {
                adminId: storedData.adminId,
                email: emailLower,
                purpose: 'password-reset'
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Remove OTP from storage after successful verification
        otpStorage.delete(emailLower);

        res.json({
            success: true,
            message: 'OTP verified successfully',
            resetToken
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while verifying OTP'
        });
    }
});

// POST /api/auth/reset-password - Reset password with verified OTP
router.post('/reset-password', async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        // Validate input
        if (!resetToken || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Reset token and new password are required'
            });
        }

        // Validate password strength
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        // Verify reset token
        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

            if (decoded.purpose !== 'password-reset') {
                throw new Error('Invalid token purpose');
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await query(
            'UPDATE admins SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [hashedPassword, decoded.adminId]
        );

        // Get admin details for email
        const adminResult = await query(
            'SELECT email, full_name FROM admins WHERE id = $1',
            [decoded.adminId]
        );

        if (adminResult.rows.length > 0) {
            const admin = adminResult.rows[0];
            // Send confirmation email
            await sendPasswordResetSuccessEmail(admin.email, admin.full_name);
        }

        res.json({
            success: true,
            message: 'Password has been reset successfully'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while resetting password'
        });
    }
});

// POST /api/auth/register - Register new admin (protected endpoint - only for super admins)
router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName, role = 'admin' } = req.body;

        // Validate input
        if (!email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and full name are required'
            });
        }

        // Check if email already exists
        const existingAdmin = await query(
            'SELECT id FROM admins WHERE email = $1',
            [email.toLowerCase()]
        );

        if (existingAdmin.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'An admin with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin
        const result = await query(
            `INSERT INTO admins (email, password, full_name, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, full_name, role, created_at`,
            [email.toLowerCase(), hashedPassword, fullName, role]
        );

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            admin: result.rows[0]
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration'
        });
    }
});

// GET /api/auth/me - Get current admin profile (protected)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // req.user contains the decoded JWT token data (id, email, role)
        const adminId = req.user.id;

        // Fetch admin details from database
        const result = await query(
            'SELECT id, email, full_name, role, is_active, last_login, created_at FROM admins WHERE id = $1',
            [adminId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        const admin = result.rows[0];

        // Check if account is still active
        if (!admin.is_active) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been deactivated'
            });
        }

        res.json({
            success: true,
            admin: {
                id: admin.id,
                email: admin.email,
                fullName: admin.full_name,
                role: admin.role,
                isActive: admin.is_active,
                lastLogin: admin.last_login,
                createdAt: admin.created_at
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching profile'
        });
    }
});

// POST /api/auth/change-password - Change password (protected)
router.post('/change-password', authMiddleware, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const adminId = req.user.id;

        if (!newPassword) {
            return res.status(400).json({ success: false, message: 'New password is required' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await query('UPDATE admins SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [hashedPassword, adminId]);

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
