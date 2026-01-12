// Email service for sending emails using nodemailer
const nodemailer = require('nodemailer');
const { getOTPEmailTemplate, getPasswordResetSuccessTemplate } = require('./emailTemplates');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP email
const sendOTPEmail = async (email, otp, fullName) => {
    try {
        const mailOptions = {
            from: {
                name: 'Bezawu Admin Panel',
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: '🔐 Password Reset OTP - Bezawu Admin Panel',
            html: getOTPEmailTemplate(otp, fullName)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Send password reset success email
const sendPasswordResetSuccessEmail = async (email, fullName) => {
    try {
        const mailOptions = {
            from: {
                name: 'Bezawu Admin Panel',
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: '✅ Password Reset Successful - Bezawu Admin Panel',
            html: getPasswordResetSuccessTemplate(fullName)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset success email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending password reset success email:', error);
        throw new Error('Failed to send password reset success email');
    }
};

module.exports = {
    sendOTPEmail,
    sendPasswordResetSuccessEmail
};
