# 🚀 QUICK START: Production Deployment

**Ready to deploy? Follow these steps in order.**

---

## ⚡ 5-Minute Pre-Deployment Checklist

### 1️⃣ Change Admin Password (CRITICAL!)

```bash
cd d:\IT_web\IT_Website\server\scripts
node create-admin.js
```

**Enter:**
- Name: `Admin` (or your preferred name)
- Email: `admin@synnectify.com` (or your preferred admin email)
- Password: **Create a strong password** (min 8 characters)
- Confirm password

**💾 SAVE THESE CREDENTIALS SECURELY!**

---

### 2️⃣ Generate JWT Secret

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Copy the output** - you'll need it for .env configuration.

---

### 3️⃣ Configure Production Environment

Create `.env` in `server/` folder (copy from `.env.example`):

```env
# MongoDB Atlas (get from https://cloud.mongodb.com)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/it_website_db

# JWT Secret (from step 2)
JWT_SECRET=paste-your-generated-secret-here

# Email Configuration
EMAIL_USER=noreply@synnectify.com
EMAIL_PASS=your-gmail-app-password-here
EMAIL_FROM=SYNNECTIFY Careers <noreply@synnectify.com>
EMAIL_REPLY_TO=careers.synnectify@gmail.com

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

# Production URL
CLIENT_URL=https://yourdomain.com
PORT=5000
```

---

### 4️⃣ Set Up Gmail App Password

1. Go to [Google Account](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** → Generate
5. Copy the 16-character password
6. Use as `EMAIL_PASS` in `.env`

---

### 5️⃣ Build Frontend

```bash
cd d:\IT_web\IT_Website
npm run build
```

This creates a `dist/` folder ready for deployment.

---

## 🌐 Hostinger Deployment

### Upload Files

1. **Backend**: Upload `server/` folder to `public_html/api/`
2. **Frontend**: Upload `dist/` contents to `public_html/`

### Set Environment Variables

In Hostinger panel → **Environment Variables**, add all variables from step 3.

### Install Dependencies

Via SSH or Terminal:
```bash
cd public_html/api
npm install --production
```

### Start Server

**Option A: Node.js Selector**
- Application Root: `public_html/api`
- Entry Point: `server.js`
- Click **Start**

**Option B: PM2**
```bash
cd public_html/api
pm2 start server.js --name synnectify-api
pm2 save
```

---

## ✅ Verify Deployment

### 1. Test Backend
```
https://yourdomain.com/api/ping
```
Should return: `{"status":"active","timestamp":"...","environment":"production"}`

### 2. Test Admin Login
```
https://yourdomain.com/admin-login
```
Login with credentials from Step 1.

### 3. Test Job Application
- Go to Careers page
- Apply for a job
- Check if emails are received

### 4. Check Admin Dashboard
- Review applications
- Test status updates (Shortlist/Reject)
- Verify emails sent correctly

---

## 🆘 Common Issues

### Email Not Sending?
```bash
# Check credentials in Hostinger environment variables
# Regenerate Gmail App Password
# Check server logs for errors
```

### Admin Login Failed?
```bash
# Verify admin user created in database
# Check JWT_SECRET is set
# Clear browser cache/cookies
```

### CORS Error?
```bash
# Verify CLIENT_URL matches your domain exactly
# Check protocol (https://, not http://)
# No trailing slashes
```

---

## 📚 Full Documentation

- **Complete Guide**: `DEPLOYMENT_GUIDE.md`
- **Security Details**: `SECURITY_ADMIN_GUIDE.md`
- **Changes Summary**: `ADMIN_SECURITY_IMPROVEMENTS_SUMMARY.md`

---

## 📞 Support

- **Email**: careers.synnectify@gmail.com
- **Phone**: +91 9494669228

---

**That's it! Your website is production-ready!** 🎉
