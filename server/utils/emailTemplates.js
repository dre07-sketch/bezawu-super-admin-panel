// Email templates with modern, cool designs

const getOTPEmailTemplate = (otp, fullName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 50px 50px;
                animation: moveBackground 20s linear infinite;
            }
            @keyframes moveBackground {
                0% { transform: translate(0, 0); }
                100% { transform: translate(50px, 50px); }
            }
            .logo {
                width: 80px;
                height: 80px;
                background: white;
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 36px;
                font-weight: bold;
                color: #667eea;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                position: relative;
                z-index: 1;
            }
            .header h1 {
                color: white;
                font-size: 28px;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
            }
            .header p {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                position: relative;
                z-index: 1;
            }
            .content {
                padding: 50px 40px;
            }
            .greeting {
                font-size: 20px;
                color: #333;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                color: #666;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .otp-container {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
                position: relative;
                overflow: hidden;
            }
            .otp-container::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe);
                border-radius: 15px;
                z-index: -1;
                animation: borderRotate 3s linear infinite;
            }
            @keyframes borderRotate {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            .otp-label {
                font-size: 14px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 15px;
                font-weight: 600;
            }
            .otp-code {
                font-size: 48px;
                font-weight: bold;
                color: #667eea;
                letter-spacing: 12px;
                font-family: 'Courier New', monospace;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                margin: 10px 0;
            }
            .otp-validity {
                font-size: 14px;
                color: #e74c3c;
                margin-top: 15px;
                font-weight: 600;
            }
            .warning {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 15px 20px;
                margin: 30px 0;
                border-radius: 5px;
            }
            .warning-title {
                font-weight: bold;
                color: #856404;
                margin-bottom: 5px;
            }
            .warning-text {
                color: #856404;
                font-size: 14px;
            }
            .footer {
                background: #f8f9fa;
                padding: 30px 40px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer-text {
                color: #6c757d;
                font-size: 14px;
                line-height: 1.6;
            }
            .social-links {
                margin-top: 20px;
            }
            .social-links a {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: #667eea;
                color: white;
                border-radius: 50%;
                margin: 0 5px;
                line-height: 40px;
                text-decoration: none;
                transition: transform 0.3s ease;
            }
            .social-links a:hover {
                transform: translateY(-3px);
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">B</div>
                <h1>Password Reset Request</h1>
                <p>Secure OTP Verification</p>
            </div>
            
            <div class="content">
                <div class="greeting">Hello ${fullName},</div>
                
                <div class="message">
                    We received a request to reset your password for your Bezawu Super Admin Panel account. 
                    Use the verification code below to complete the password reset process.
                </div>
                
                <div class="otp-container">
                    <div class="otp-label">Your Verification Code</div>
                    <div class="otp-code">${otp}</div>
                    <div class="otp-validity">⏱️ Valid for 10 minutes</div>
                </div>
                
                <div class="warning">
                    <div class="warning-title">🔒 Security Notice</div>
                    <div class="warning-text">
                        If you didn't request this password reset, please ignore this email and ensure your account is secure. 
                        Never share this code with anyone.
                    </div>
                </div>
                
                <div class="message">
                    For your security, this code will expire in 10 minutes. If you need a new code, 
                    you can request another one from the password reset page.
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-text">
                    <strong>Bezawu Super Admin Panel</strong><br>
                    This is an automated message, please do not reply to this email.<br>
                    © ${new Date().getFullYear()} Bezawu. All rights reserved.
                </div>
                <div class="social-links">
                    <a href="#" title="Facebook">f</a>
                    <a href="#" title="Twitter">t</a>
                    <a href="#" title="LinkedIn">in</a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

const getPasswordResetSuccessTemplate = (fullName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                padding: 40px 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                padding: 40px 30px;
                text-align: center;
            }
            .success-icon {
                width: 80px;
                height: 80px;
                background: white;
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            .header h1 {
                color: white;
                font-size: 28px;
                margin-bottom: 10px;
            }
            .content {
                padding: 50px 40px;
                text-align: center;
            }
            .message {
                font-size: 16px;
                color: #666;
                line-height: 1.6;
                margin: 20px 0;
            }
            .footer {
                background: #f8f9fa;
                padding: 30px 40px;
                text-align: center;
                border-top: 1px solid #e9ecef;
                color: #6c757d;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="success-icon">✓</div>
                <h1>Password Reset Successful!</h1>
            </div>
            <div class="content">
                <div class="message">
                    <strong>Hello ${fullName},</strong><br><br>
                    Your password has been successfully reset. You can now log in to your Bezawu Super Admin Panel account with your new password.
                </div>
            </div>
            <div class="footer">
                <strong>Bezawu Super Admin Panel</strong><br>
                © ${new Date().getFullYear()} Bezawu. All rights reserved.
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = {
    getOTPEmailTemplate,
    getPasswordResetSuccessTemplate
};
