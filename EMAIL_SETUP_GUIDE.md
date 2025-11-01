# 📧 Email Configuration Guide

## Current Status

✅ **Application submission is working** - Applications are saved to the database  
⚠️ **Email sending is disabled** - Due to missing email credentials

---

## Why Emails Aren't Sending

The error you're seeing is:
```
Error: Missing credentials for "PLAIN"
```

This is because `EMAIL_PASS` is empty in the `.env` file.

---

## Option 1: Use Gmail with App Password (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Turn it ON

### Step 2: Create App Password
1. Go to Security → App passwords
2. Select "Mail" and "Other (Custom name)"
3. Name it "SYNNECTIFY Career Portal"
4. Click Generate
5. Copy the 16-character password

### Step 3: Update .env File
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=SYNNECTIFY Careers <your-email@gmail.com>
EMAIL_REPLY_TO=careers.synnectify@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

### Step 4: Restart Backend
```bash
cd server
npm start
```

---

## Option 2: Continue Without Email (Current Setup)

The application is configured to save submissions even if emails fail. This means:

✅ Applications ARE saved to database  
✅ Users see success message  
✅ Applications appear in dashboard  
❌ Email notifications are skipped  

**This is fine for development/testing!**

---

## Option 3: Use a Different Email Service

### Outlook/Hotmail:
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### SendGrid (Professional):
```env
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
```

---

## Testing Email Configuration

After setting up, test with this script:

```bash
cd server
node -e "require('./utils/mailer').sendEmail('test@example.com', 'Test', '<h1>Test</h1>').then(() => console.log('✅ Email sent!')).catch(e => console.error('❌ Error:', e))"
```

---

## Current Behavior

### When Application is Submitted:

1. ✅ Form data is validated
2. ✅ Resume is uploaded to `server/uploads/`
3. ✅ Application is saved to MongoDB
4. ⚠️ Email attempts (fails silently if no credentials)
5. ✅ Success message shown to user
6. ✅ User redirected to dashboard
7. ✅ Application appears in "My Applications"

**Bottom line**: Everything works except email notifications!

---

## Recommendation

For development:
- ✅ Current setup is fine
- Applications work perfectly
- No email configuration needed

For production:
- Set up Gmail App Password (Option 1)
- Or use SendGrid for professional emails
- Update `.env` with credentials
- Restart server

---

**Last Updated**: 2025-10-18
