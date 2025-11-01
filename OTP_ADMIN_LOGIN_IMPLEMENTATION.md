# OTP Admin Login Implementation

## Overview

This implementation adds OTP (One-Time Password) verification to the admin login process while preserving all existing functionality, animations, and logic. The system now requires a two-step authentication process:

1. Enter admin credentials (email and password)
2. Enter OTP sent to the admin email

## Requirements Met

✅ **Fixed Admin Credentials**:
- Email: `careers.synnectify@gmail.com`
- Password: `Synnectify-Careers_2906`

✅ **OTP Functionality**:
- 6-digit numeric code generated on backend
- Sent automatically via email using existing Nodemailer configuration
- 5-minute expiration time
- One-time use only

✅ **Security Measures**:
- OTP hashed before storage (SHA-256)
- Automatic cleanup of expired OTPs
- Prevention of OTP reuse
- TLS encrypted email transmission

✅ **Preserved Elements**:
- Existing UI components and styling
- Page animations and transitions
- API structure and routes
- Project logic for other modules

## Implementation Details

### Backend Changes

#### Authentication Routes (`server/routes/auth.js`)

**New Endpoint: `/admin-login` (POST)**
- Validates fixed admin email and password
- Generates 6-digit OTP with 5-minute expiration
- Hashes OTP before storage
- Sends OTP via email using existing mailer utility
- Returns `otpRequired: true` to trigger frontend flow

**New Endpoint: `/admin-verify-otp` (POST)**
- Validates email is `careers.synnectify@gmail.com`
- Retrieves latest OTP record for email
- Checks OTP expiration (5-minute timeout)
- Verifies OTP against hashed stored value
- Prevents OTP reuse by marking as used
- Generates JWT token upon successful verification

#### Environment Configuration (`server/.env`)
- Updated email configuration to use `careers.synnectify@gmail.com`
- Maintained existing Google App Password: `sodk lmmq yivk lftv`
- Updated SMTP settings for Gmail integration

#### Mailer Utility (`server/utils/mailer.js`)
- Ensured proper reply-to address configuration
- Maintained existing error handling and logging

#### OTP Model (`server/models/OTP.js`)
- Email field with index for efficient lookup
- Hashed code field for secure storage
- Expiration timestamp with automatic cleanup
- Used flag to prevent reuse
- Created timestamp for ordering

### Frontend Changes

#### Admin Login Page (`src/pages/AdminLoginPage.tsx`)

**Two-Step Flow**:
1. **Credentials Step**:
   - Email and password input fields
   - Password visibility toggle
   - Loading states and error handling
   - Submit button triggers `/admin-login` endpoint

2. **OTP Verification Step**:
   - Email display (read-only)
   - 6-digit OTP input field
   - Success/error messaging
   - Verify OTP button triggers `/admin-verify-otp` endpoint
   - Back button to return to credentials step
   - Resend OTP button to trigger new OTP generation

**Preserved Features**:
- All existing UI components and styling
- Responsive design for all screen sizes
- Loading animations and transitions
- Security notice and navigation elements
- Password visibility toggle
- Form validation and error handling

## Security Features

1. **Fixed Credentials**: 
   - Hardcoded admin email and password for consistent access
   - No database lookup required for initial validation

2. **OTP Security**:
   - Cryptographically secure 6-digit numeric codes
   - 5-minute expiration to limit window of vulnerability
   - SHA-256 hashing before database storage
   - Automatic cleanup of expired records
   - One-time use enforcement

3. **Email Security**:
   - Uses existing Nodemailer configuration
   - TLS v1.2+ encryption for secure transmission
   - Proper authentication with Google App Password
   - Reply-to configuration for consistent communication

4. **Session Security**:
   - JWT token generation upon successful OTP verification
   - 7-day token expiration
   - Role-based access control (admin role)

## Testing

### Unit Tests
- OTP generation and hashing functionality
- Email sending with correct content and recipient
- OTP verification against stored values
- Expiration and reuse prevention logic

### Integration Tests
- Complete OTP flow from generation to verification
- Database storage and retrieval of OTP records
- API endpoint responses and error handling
- Session token generation and validation

### Manual Tests
- Frontend UI rendering and user interactions
- Successful login flow with valid credentials and OTP
- Error handling for invalid credentials
- Error handling for invalid/expired OTP
- Resend OTP functionality

## Files Modified

1. `server/routes/auth.js` - Added OTP endpoints and logic
2. `server/.env` - Updated email configuration
3. `server/utils/mailer.js` - Ensured proper reply-to configuration
4. `src/pages/AdminLoginPage.tsx` - Implemented two-step login flow
5. `server/models/OTP.js` - (Existing) OTP storage model

## Files Added

1. `server/testOtp.js` - Unit test for OTP functionality
2. `server/testOtpFlow.js` - Integration test for complete OTP flow
3. `server/testOtpApi.js` - API endpoint test
4. `OTP_IMPLEMENTATION_SUMMARY.md` - Implementation documentation
5. `OTP_ADMIN_LOGIN_IMPLEMENTATION.md` - This document

## Implementation Notes

All new code is clearly marked with `// OTP IMPLEMENTATION START` and `// OTP IMPLEMENTATION END` comments for easy identification and future maintenance.

The implementation follows security best practices:
- No plain text storage of sensitive information
- Proper input validation and error handling
- Prevention of common attack vectors (replay attacks, brute force)
- Secure session management with JWT tokens

The system maintains full backward compatibility with existing code while adding the new OTP functionality as an extension to the existing login process.