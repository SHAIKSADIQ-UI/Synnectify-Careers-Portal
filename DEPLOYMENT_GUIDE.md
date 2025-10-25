# 🚀 SYNNECTIFY IT Website - Production Deployment Guide

## 📋 Table of Contents
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Hostinger Deployment Steps](#hostinger-deployment-steps)
- [Environment Configuration](#environment-configuration)
- [Security Best Practices](#security-best-practices)
- [Email Configuration](#email-configuration)
- [Database Setup](#database-setup)
- [Testing & Verification](#testing--verification)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

### Security Requirements
- [ ] Change `JWT_SECRET` in `.env` to a strong random string
- [ ] Remove or secure admin default credentials
- [ ] Enable HTTPS/SSL on production domain
- [ ] Configure CORS for production domain only
- [ ] Set secure environment variables in hosting panel
- [ ] Review and restrict API endpoints

### Configuration Requirements
- [ ] MongoDB Atlas account created (or production MongoDB)
- [ ] Email SMTP credentials configured (Gmail App Password or other provider)
- [ ] Domain name registered and DNS configured
- [ ] SSL certificate obtained (usually free with Hostinger)

---

## 🌐 Hostinger Deployment Steps

### Step 1: Prepare Your Files

1. **Build Frontend:**
   ```bash
   cd d:\IT_web\IT_Website
   npm run build
   ```
   This creates a `dist` folder with production-ready frontend files.

2. **Prepare Backend:**
   - Backend files in `server/` directory are ready as-is
   - Ensure all dependencies are listed in `server/package.json`

### Step 2: Upload to Hostinger

#### Option A: Using File Manager
1. Login to Hostinger control panel
2. Navigate to **File Manager**
3. Upload backend files to `public_html/api/` or similar
4. Upload frontend `dist` folder contents to `public_html/`

#### Option B: Using Git Deployment
1. In Hostinger panel, go to **Git**
2. Connect your GitHub/GitLab repository
3. Set deployment branch to `main` or `production`
4. Configure auto-deployment on push

### Step 3: Configure Environment Variables

1. In Hostinger panel, find **Environment Variables** section
2. Add the following variables:

```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/it_website_db

# Security
JWT_SECRET=<generate-strong-random-string-here>

# Email
EMAIL_USER=noreply@synnectify.com
EMAIL_PASS=<gmail-app-password-here>
EMAIL_FROM=SYNNECTIFY Careers <noreply@synnectify.com>
EMAIL_REPLY_TO=careers.synnectify@gmail.com

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

# Server
CLIENT_URL=https://yourdomain.com
PORT=5000
```

### Step 4: Install Dependencies

1. Connect to Hostinger via **SSH** or use **Terminal** in control panel
2. Navigate to backend directory:
   ```bash
   cd public_html/api
   npm install --production
   ```

### Step 5: Start Backend Server

1. **Using Node.js Selector** (if available):
   - Select Node.js version (16.x or higher)
   - Set entry point: `server.js`
   - Set application root: `public_html/api`
   - Click **Start Application**

2. **Using PM2** (recommended):
   ```bash
   npm install -g pm2
   cd public_html/api
   pm2 start server.js --name synnectify-api
   pm2 save
   pm2 startup
   ```

### Step 6: Configure Apache/Nginx

Add to `.htaccess` in `public_html/`:

```apache
# Rewrite frontend routes
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # API proxy
  RewriteCond %{REQUEST_URI} ^/api
  RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
  
  # Frontend routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔐 Security Best Practices

### 1. Generate Strong JWT Secret
```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 2. Secure Admin Credentials

**Default admin:** `admin@synnectify.com` / `admin123456`

⚠️ **IMPORTANT**: Change these before going live!

To create a new admin user:

```bash
# Connect to MongoDB
mongo it_website_db

# Update admin password (hashed with SHA-256)
db.users.updateOne(
  { email: "admin@synnectify.com" },
  { $set: { 
    email: "your-new-admin@synnectify.com",
    password: "<sha256-hashed-password>"
  }}
)
```

Or use the backend script:
```bash
cd server
node scripts/create-admin.js
```

### 3. CORS Configuration

Update `server/server.js`:
```javascript
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];
```

### 4. Rate Limiting

Install and configure rate limiting:
```bash
npm install express-rate-limit
```

Add to `server/server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 📧 Email Configuration

### Gmail Setup (Recommended for Testing)

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Create App Password:**
   - Visit [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the 16-character password
   - Use this as `EMAIL_PASS` in `.env`

3. **Configure .env:**
   ```bash
   EMAIL_USER=noreply@synnectify.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_REPLY_TO=careers.synnectify@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   ```

### Production Email Providers

For production, consider professional SMTP services:

#### SendGrid
- Free tier: 100 emails/day
- SMTP: `smtp.sendgrid.net:587`
- [Signup](https://sendgrid.com/)

#### Mailgun
- Free tier: 5,000 emails/month
- SMTP: `smtp.mailgun.org:587`
- [Signup](https://www.mailgun.com/)

#### AWS SES
- $0.10 per 1,000 emails
- SMTP: `email-smtp.us-east-1.amazonaws.com:587`
- [Signup](https://aws.amazon.com/ses/)

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create Account:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster:**
   - Choose free M0 tier
   - Select region closest to your server
   - Create cluster

3. **Configure Access:**
   - **Database Access**: Create user with read/write permissions
   - **Network Access**: Add `0.0.0.0/0` (allow all IPs) or your server IP

4. **Get Connection String:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/it_website_db?retryWrites=true&w=majority
   ```

5. **Update .env:**
   ```bash
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/it_website_db
   ```

### Migrate Local Data to Atlas

```bash
# Export local data
mongodump --db=it_website_db --out=./backup

# Import to Atlas
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/it_website_db" ./backup/it_website_db
```

---

## 🧪 Testing & Verification

### Pre-Launch Testing Checklist

- [ ] Frontend loads correctly at production URL
- [ ] API endpoints respond (test `/api/ping`)
- [ ] Admin login works with secure credentials
- [ ] Job listings display correctly
- [ ] Job application submission works
- [ ] Email notifications sent successfully
- [ ] Resume uploads work
- [ ] Application status updates work
- [ ] All images and assets load
- [ ] Mobile responsiveness verified
- [ ] HTTPS/SSL working (no mixed content warnings)

### API Health Check

```bash
# Test backend
curl https://yourdomain.com/api/ping

# Expected response:
Server active
```

### Email Testing

Submit a test application and verify:
1. Applicant receives confirmation email
2. Admin receives notification email at `careers.synnectify@gmail.com`
3. Reply-to address is set correctly
4. Email templates render properly

---

## 🔧 Troubleshooting

### Backend Not Starting

**Check:**
- Node.js version compatibility (v16+)
- All dependencies installed (`npm install`)
- Port 5000 available
- Environment variables set correctly

**Logs:**
```bash
pm2 logs synnectify-api
```

### Email Not Sending

**Check:**
- `EMAIL_USER` and `EMAIL_PASS` set correctly
- Gmail App Password generated (not regular password)
- SMTP credentials valid
- Check server logs for authentication errors

**Test Email:**
```bash
cd server
node test-email.js
```

### Database Connection Failed

**Check:**
- MongoDB Atlas cluster running
- IP address whitelisted in Network Access
- Connection string correct in `MONGO_URI`
- Username/password encoded properly (special characters)

**Test Connection:**
```bash
cd server
node test-db.js
```

### Admin Login Not Working

**Check:**
- Admin user exists in database
- Password hashed correctly (SHA-256)
- `JWT_SECRET` set in environment
- Browser cookies/localStorage not blocked

**Reset Admin:**
```bash
cd server
node scripts/reset-admin.js
```

### CORS Errors

**Check:**
- `CLIENT_URL` matches your production domain exactly
- Protocol (http vs https) matches
- No trailing slashes in URLs

**Update:**
```javascript
// server/server.js
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];
```

---

## 📞 Support & Resources

### Documentation
- [Node.js Deployment Guide](https://nodejs.org/en/docs/guides/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Hostinger Node.js Hosting](https://www.hostinger.com/tutorials/how-to-host-node-js)

### Contact
- **Technical Issues**: careers.synnectify@gmail.com
- **Hostinger Support**: [Support Portal](https://www.hostinger.com/help)

---

## 📝 Post-Deployment Checklist

- [ ] Monitor application logs for errors
- [ ] Set up automated backups (database + files)
- [ ] Configure domain email forwarding
- [ ] Test all features in production
- [ ] Update DNS records if needed
- [ ] Enable monitoring/analytics
- [ ] Document admin credentials securely
- [ ] Schedule regular security updates

---

**Last Updated:** 2025-10-18  
**Version:** 1.0  
**Prepared for:** Synnectify Technologies Production Deployment
