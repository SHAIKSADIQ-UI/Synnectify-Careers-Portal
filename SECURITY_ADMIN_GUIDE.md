# 🔐 SYNNECTIFY - Security & Admin Guide

## 📋 Table of Contents
- [Admin Access & Security](#admin-access--security)
- [Email System Configuration](#email-system-configuration)
- [Security Best Practices](#security-best-practices)
- [Production Security Checklist](#production-security-checklist)
- [Admin User Management](#admin-user-management)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🔑 Admin Access & Security

### Admin Login URL
- **Development**: `http://localhost:5175/admin-login`
- **Production**: `https://yourdomain.com/admin-login`

### Default Credentials (CHANGE BEFORE DEPLOYMENT!)

⚠️ **CRITICAL SECURITY WARNING** ⚠️

The default admin credentials have been **REMOVED from the login page** for security. However, they still exist in the database:

- **Email**: `admin@synnectify.com`
- **Password**: `admin123456`

### 🚨 IMMEDIATE ACTION REQUIRED FOR PRODUCTION:

1. **Change Admin Credentials** using the script:
   ```bash
   cd server/scripts
   node create-admin.js
   ```

2. **Generate Strong Password** (minimum requirements):
   - At least 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Not related to company name or common words
   - Example: `Sy#n3ct!fy2025@Adm1n`

3. **Secure Storage**:
   - Store credentials in password manager (LastPass, 1Password, Bitwarden)
   - Never share via email or unencrypted channels
   - Use different password than other company accounts

### Admin Features

Once logged in, admins can:
- ✅ View all job applications
- ✅ Review candidate resumes
- ✅ Shortlist candidates (sends congratulations email)
- ✅ Reject applications (sends polite rejection email)
- ✅ Ignore spam applications (no email sent)
- ✅ Manage job postings
- ✅ Delete outdated jobs
- ✅ Monitor application statistics

---

## 📧 Email System Configuration

### Email Flow

#### 1. Application Submission
When a candidate applies:
- **Notification to Company**: `careers.synnectify@gmail.com`
  - Subject: "New Job Application Received - [Position]"
  - Contains: Applicant details, resume link, position info
  
- **Confirmation to Applicant**: Applicant's email
  - Subject: "Application Received - [Position] at SYNNECTIFY"
  - Contains: Application confirmation, status info, next steps

#### 2. Application Status Updates

**Shortlisted:**
- Email to applicant with congratulations
- Indicates HR will contact them
- Reply-to: `careers.synnectify@gmail.com`

**Rejected:**
- Polite rejection email
- Encourages future applications
- Reply-to: `careers.synnectify@gmail.com`

**Ignored:**
- NO email sent (for spam/incomplete applications)

### Reply-To Configuration

All emails sent to applicants have:
- **From**: `SYNNECTIFY Careers <noreply@synnectify.com>`
- **Reply-To**: `careers.synnectify@gmail.com`

This ensures:
✅ Applicants can reply directly to HR
✅ Replies go to the monitored careers inbox
✅ Professional email appearance
✅ No-reply address prevents inbox clutter

### Email Setup for Production

#### Option 1: Gmail with App Password (Recommended for Small Scale)

1. **Enable 2FA on Gmail**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Visit [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy 16-character password

3. **Configure in Hostinger**:
   ```env
   EMAIL_USER=noreply@synnectify.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_REPLY_TO=careers.synnectify@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   ```

**Limits**: 500 emails/day (sufficient for small recruitment campaigns)

#### Option 2: Professional SMTP Service (Recommended for Production)

**SendGrid** (Free: 100/day, Paid: Unlimited)
```env
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
```

**Mailgun** (Free: 5,000/month)
```env
EMAIL_USER=postmaster@yourdomain.mailgun.org
EMAIL_PASS=your-mailgun-password
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
```

**AWS SES** ($0.10 per 1,000 emails)
```env
EMAIL_USER=your-ses-smtp-username
EMAIL_PASS=your-ses-smtp-password
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
```

### Testing Email Configuration

```bash
cd server
node -e "require('./utils/mailer').sendEmail('your-email@gmail.com', 'Test Email', '<h1>Test</h1>').then(() => console.log('Success')).catch(err => console.error(err))"
```

---

## 🛡️ Security Best Practices

### 1. Environment Variables

**NEVER commit `.env` file to Git!**

Add to `.gitignore`:
```
# Environment variables
.env
.env.local
.env.production
server/.env
```

Verify:
```bash
git status  # .env should NOT appear
```

### 2. JWT Secret Security

**Generate Strong Secret:**
```bash
# Linux/Mac
openssl rand -base64 64

# Windows PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Update `.env`:**
```env
JWT_SECRET=your-generated-secret-here-make-it-long-and-random
```

### 3. CORS Configuration

**Development (multiple ports):**
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
];
```

**Production (specific domain only):**
```javascript
const allowedOrigins = [
  'https://synnectify.com',
  'https://www.synnectify.com'
];
```

### 4. HTTPS Enforcement

In production, redirect HTTP to HTTPS:

**.htaccess:**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Or in Express:**
```javascript
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
```

### 5. Rate Limiting

Prevent brute force attacks on admin login:

```bash
npm install express-rate-limit
```

**server/server.js:**
```javascript
const rateLimit = require('express-rate-limit');

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later.'
});

// Strict rate limit for admin login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again after 15 minutes.'
});

app.use('/api/', apiLimiter);
app.use('/api/auth/admin-login', loginLimiter);
```

### 6. Input Validation

Install validator:
```bash
npm install validator
```

**Validate emails:**
```javascript
const validator = require('validator');

if (!validator.isEmail(email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}
```

### 7. File Upload Security

**Current settings in applications.js:**
- ✅ File extension validation (PDF, DOC, DOCX)
- ✅ File size limits (5MB max)
- ✅ Sanitized filenames
- ✅ Stored outside public directory

**Additional recommendations:**
```javascript
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files allowed'));
    }
  }
});
```

---

## ✅ Production Security Checklist

Before deploying to Hostinger, verify:

### Environment & Configuration
- [ ] `.env` file not committed to Git
- [ ] `JWT_SECRET` changed to strong random value
- [ ] Admin password changed from default
- [ ] `CLIENT_URL` set to production domain
- [ ] CORS allows only production domain
- [ ] HTTPS/SSL enabled on domain

### Database
- [ ] MongoDB Atlas or production database configured
- [ ] Database credentials secure and not exposed
- [ ] Database backups enabled
- [ ] Network access restricted (IP whitelist if possible)

### Email
- [ ] Email credentials configured (App Password or SMTP service)
- [ ] Reply-to address set to `careers.synnectify@gmail.com`
- [ ] Test emails sent successfully
- [ ] Email templates render correctly

### Application Security
- [ ] Rate limiting enabled on API endpoints
- [ ] File upload validation working
- [ ] Admin routes require authentication
- [ ] JWT tokens expire properly (7 days)
- [ ] Error messages don't expose sensitive info

### Testing
- [ ] Admin login works
- [ ] Job applications submit successfully
- [ ] Emails send to both applicant and company
- [ ] Application status updates work
- [ ] Resume downloads work
- [ ] All frontend routes accessible
- [ ] Mobile responsive

### Monitoring
- [ ] Server logs accessible
- [ ] Error tracking set up (optional: Sentry)
- [ ] Email delivery monitoring
- [ ] Uptime monitoring (optional: UptimeRobot)

---

## 👤 Admin User Management

### Create New Admin

```bash
cd server/scripts
node create-admin.js
```

Follow prompts:
- Enter name
- Enter email
- Enter password (min 8 chars)
- Confirm password

### Update Existing Admin Password

Same script:
```bash
node create-admin.js
```

If email exists, it will update the password.

### Multiple Admin Users

To create additional admin users:

1. **Via Script**: Run `create-admin.js` with different email
2. **Via Database**: 
   ```javascript
   // In MongoDB shell or Compass
   db.users.insertOne({
     name: "Secondary Admin",
     email: "admin2@synnectify.com",
     password: "hashed-password-here",
     role: "admin",
     photo: null
   })
   ```

### Remove Admin Access

```javascript
// Demote to regular user
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "user" } }
)

// Or delete
db.users.deleteOne({ email: "user@example.com" })
```

---

## 📊 Monitoring & Maintenance

### Application Logs

**View PM2 logs:**
```bash
pm2 logs synnectify-api
```

**View real-time:**
```bash
pm2 logs synnectify-api --lines 100 --raw
```

### Database Backups

**Manual backup:**
```bash
mongodump --uri="your-mongodb-uri" --out=./backup-$(date +%Y%m%d)
```

**Automated daily backup (cron):**
```bash
# Edit crontab
crontab -e

# Add line (backup at 2 AM daily)
0 2 * * * cd /home/synnectify && mongodump --uri="mongodb-uri" --out=./backups/backup-$(date +\%Y\%m\%d)
```

### Email Monitoring

Check email delivery:
- Monitor `careers.synnectify@gmail.com` inbox
- Verify applicants receive confirmation emails
- Check spam folders periodically
- Review email logs in server output

### Security Audits

**Monthly checklist:**
- [ ] Review admin access logs
- [ ] Check for failed login attempts
- [ ] Update dependencies: `npm audit fix`
- [ ] Review application error logs
- [ ] Verify SSL certificate valid
- [ ] Test email delivery
- [ ] Check disk space usage

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Security audit
npm audit
npm audit fix
```

---

## 🆘 Emergency Procedures

### Admin Lockout

If you forget admin password:

1. **Access server SSH**
2. **Run reset script**:
   ```bash
   cd server/scripts
   node create-admin.js
   ```
3. Enter new credentials

### Email Not Sending

1. **Check credentials**:
   ```bash
   # Test email
   cd server
   node -e "console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)"
   ```

2. **Regenerate App Password** (if Gmail)
3. **Check SMTP settings**
4. **Review server logs**

### Database Connection Failed

1. **Check MongoDB status**:
   ```bash
   mongo --eval "db.adminCommand('ping')"
   ```

2. **Verify connection string**:
   ```bash
   echo $MONGO_URI
   ```

3. **Check IP whitelist** (MongoDB Atlas)
4. **Restart MongoDB service**

---

## 📞 Support Contacts

### Technical Support
- **Email**: careers.synnectify@gmail.com
- **Phone**: +91 9494669228

### Hosting Provider
- **Hostinger Support**: [https://www.hostinger.com/help](https://www.hostinger.com/help)

### External Services
- **MongoDB Atlas**: [https://support.mongodb.com/](https://support.mongodb.com/)
- **SendGrid Support**: [https://support.sendgrid.com/](https://support.sendgrid.com/)

---

## 📝 Change Log

### Security Enhancements Implemented
- ✅ Removed default credentials from login page
- ✅ Enhanced admin dashboard UI/UX
- ✅ Improved email reply-to configuration
- ✅ Added production environment template (.env.example)
- ✅ Created admin management script
- ✅ Enhanced email error handling
- ✅ Improved security documentation

### Recommended Next Steps
- [ ] Implement rate limiting
- [ ] Add 2FA for admin login (future enhancement)
- [ ] Set up monitoring/alerting
- [ ] Configure automated backups
- [ ] Add audit logging for admin actions

---

**Document Version**: 1.0  
**Last Updated**: 2025-10-18  
**Maintained By**: Synnectify Technologies IT Team
