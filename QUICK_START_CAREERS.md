# 🚀 SYNNECTIFY Career Portal - Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account for sending emails
- Google Cloud Project for OAuth

## 📦 Installation (5 Minutes)

### Step 1: Install Dependencies

```bash
# Root (Frontend)
npm install

# Server (Backend)
cd server
npm install
cd ..
```

### Step 2: Configure Environment Variables

#### Backend (.env in `server/` folder)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/synnectify-careers
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=mySecretKey123
EMAIL_USER=careers.synnectify@gmail.com
EMAIL_PASS=your_16_char_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

#### Frontend (.env in root folder)
Create `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

### Step 3: Get Gmail App Password

1. Visit: https://myaccount.google.com/apppasswords
2. Create password for "Mail"
3. Copy 16-character password
4. Paste into `EMAIL_PASS` in `server/.env`

### Step 4: Get Google OAuth Client ID

1. Visit: https://console.cloud.google.com/
2. Create project → Enable Google+ API
3. Credentials → Create OAuth Client ID
4. Add origins: `http://localhost:5173`
5. Copy Client ID to `.env`

## 🎯 Running the Application

### Terminal 1 - Backend
```bash
cd server
npm run dev
```
Server runs at: http://localhost:5000

### Terminal 2 - Frontend
```bash
npm run dev
```
Frontend runs at: http://localhost:5173

### Terminal 3 - MongoDB (if local)
```bash
mongod
```

## ✅ Testing the System

### 1. Test User Flow
1. Open http://localhost:5173
2. Navigate to `/careers`
3. Click "Apply Now" on any job
4. Login with Google
5. Fill application form
6. Submit
7. Check `careers.synnectify@gmail.com` inbox
8. Check your email inbox for confirmation

### 2. Test User Dashboard
1. After applying, click profile icon → Dashboard
2. View your applications
3. Check application status

### 3. Test Admin Dashboard
1. Create admin user in database OR
2. Use auth endpoint to register admin
3. Navigate to `/admin`
4. View applications
5. Click "Shortlist" or "Reject"
6. Check applicant email for status update

## 🔧 Quick Commands

```bash
# Start everything (from root)
npm run dev & cd server && npm run dev

# Seed database with sample jobs
cd server && node seed.js

# Check if server is running
curl http://localhost:5000/api/ping

# View logs
# Check terminal output for errors
```

## 📧 Email Testing Checklist

- [ ] Application submitted → Email to careers.synnectify@gmail.com ✅
- [ ] Application submitted → Confirmation email to user ✅
- [ ] Admin shortlists → Congratulations email to user ✅
- [ ] Admin rejects → Rejection email to user ✅
- [ ] All emails have SYNNECTIFY branding ✅

## 🐛 Common Issues & Fixes

### Issue: "Email not sending"
**Fix**: 
```bash
# Check .env file
cat server/.env | grep EMAIL

# Verify Gmail App Password
# Make sure it's 16 characters, no spaces
```

### Issue: "Google login failed"
**Fix**:
```bash
# Check client ID
cat .env | grep GOOGLE

# Verify authorized origins in Google Cloud Console
# Should be: http://localhost:5173
```

### Issue: "Cannot connect to MongoDB"
**Fix**:
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://...
```

### Issue: "Applications not showing in admin dashboard"
**Fix**:
```bash
# Create admin user
# In MongoDB:
db.users.insertOne({
  email: "admin@synnectify.com",
  password: "hashed_password",
  role: "admin"
})
```

## 📋 Feature Checklist

After setup, verify:

- [ ] Home page loads without login button ✅
- [ ] Careers page shows job listings ✅
- [ ] "Apply Now" triggers Google login ✅
- [ ] User can fill and submit application ✅
- [ ] Email sent to careers.synnectify@gmail.com ✅
- [ ] Confirmation email sent to user ✅
- [ ] User profile shows in header ✅
- [ ] Dashboard shows application history ✅
- [ ] Admin can view applications ✅
- [ ] Status update sends email ✅

## 🎨 Customization

### Change Company Email
Edit `server/routes/applications.js`:
```javascript
const companyEmail = 'your-email@company.com';
```

### Change Email From Name
Edit `server/utils/mailer.js`:
```javascript
const fromAddress = 'Your Company <noreply@company.com>';
```

### Add Your Logo to Emails
Edit email templates in `server/routes/applications.js`:
```html
<img src="https://your-cdn.com/logo.png" alt="Logo" />
```

## 📱 Production Deployment

### Environment Variables to Update:
```env
NODE_ENV=production
CLIENT_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://production-cluster
JWT_SECRET=super_secure_random_string
```

### Build Commands:
```bash
# Frontend
npm run build

# Serve with nginx or similar
```

## 🆘 Need Help?

1. Check `CAREERS_SYSTEM_DOCUMENTATION.md` for detailed info
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all `.env` variables are set
5. Email: careers.synnectify@gmail.com

## 🎉 You're Ready!

The system is now fully configured. Users can:
- Browse website freely
- Apply to jobs with Google login
- Receive email confirmations
- Track application status

Admins can:
- View all applications
- Accept/Reject applications
- Send automated email updates

---

**Next Steps**: 
1. Add job postings: `cd server && node seed.js`
2. Test the full application flow
3. Review emails in inbox
4. Customize email templates
5. Deploy to production

**Happy Hiring! 🚀**
