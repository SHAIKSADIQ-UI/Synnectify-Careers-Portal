# Quick Deployment Guide - Production Fixes

## 🚀 Quick Start

This guide will help you deploy the fixes to production and resolve the issues with job applications, email notifications, and admin OTP login.

## 📋 Prerequisites

1. Render account (for backend)
2. Vercel account (for frontend)
3. MongoDB Atlas account
4. Gmail account with App Password

## ⚡ Quick Fix Steps

### Step 1: Update Backend Environment Variables (Render)

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add/Update these variables:

```bash
# Required
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
JWT_SECRET=your-random-secret-key-min-32-chars
CLIENT_URL=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production

# Optional (defaults provided)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_FROM=SYNNECTIFY Careers <your-email@gmail.com>
EMAIL_REPLY_TO=careers.synnectify@gmail.com
```

5. **Save** and **Restart** your service

### Step 2: Update Frontend Environment Variables (Vercel)

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:

```bash
VITE_API_URL=https://synnectify-backend.onrender.com/api
```

5. **Redeploy** your application

### Step 3: Verify Backend is Running

1. Check Render logs for:
   - ✅ "MongoDB Connected Successfully"
   - ✅ "Email: Configured"
   - ✅ "CORS: X origins allowed"

2. Test backend:
   ```bash
   curl https://synnectify-backend.onrender.com/api/ping
   ```

3. Test email configuration:
   ```bash
   curl https://synnectify-backend.onrender.com/api/test-email-config
   ```

### Step 4: Verify Frontend is Working

1. Open your Vercel deployment URL
2. Check browser console for:
   - ✅ "🔗 API URL: https://synnectify-backend.onrender.com/api"
   - ❌ No CORS errors
   - ❌ No network errors

### Step 5: Test Functionality

1. **Test Job Application**:
   - Go to Careers page
   - Fill out application form
   - Submit application
   - Verify application is saved
   - Check email for confirmation

2. **Test Admin Login**:
   - Go to admin login page
   - Enter credentials
   - Verify OTP is sent to email
   - Enter OTP and verify login works

## 🔍 Troubleshooting

### Email Not Sending?

1. **Check Gmail App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Generate new app password for "Mail"
   - Use this as `EMAIL_PASSWORD` in Render

2. **Verify Environment Variables**:
   - Check Render logs for "EMAIL_USER: SET" and "EMAIL_PASSWORD: SET"
   - Verify no typos in email address

3. **Test Email Configuration**:
   ```bash
   curl https://your-backend.onrender.com/api/test-email-config
   ```

### CORS Errors?

1. **Verify Frontend URL**:
   - Check `CLIENT_URL` and `FRONTEND_URL` in Render
   - Must match exact Vercel URL (including `https://`)
   - No trailing slash

2. **Check Render Logs**:
   - Look for "CORS blocked origin" messages
   - Verify your Vercel URL is in allowed origins

3. **Verify API URL**:
   - Check `VITE_API_URL` in Vercel
   - Must be `https://synnectify-backend.onrender.com/api`

### Application Not Submitting?

1. **Check Browser Console**:
   - Look for API errors
   - Verify API URL is correct
   - Check for network errors

2. **Check Backend Logs**:
   - Look for application submission errors
   - Verify MongoDB connection
   - Check for validation errors

3. **Verify Database**:
   - Check MongoDB Atlas for new applications
   - Verify IP whitelisting allows Render IPs

### OTP Not Sending?

1. **Check Email Configuration**:
   - Same as "Email Not Sending?" above
   - Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set

2. **Check Render Logs**:
   - Look for OTP email sending errors
   - Verify email configuration is correct

3. **Verify Admin Email**:
   - Check that admin email is `careers.synnectify@gmail.com`
   - Verify email is receiving other emails

## 📊 Monitoring

### Backend Logs (Render)
Monitor for:
- ✅ Application submissions
- ✅ Email sending success/failure
- ✅ CORS issues
- ✅ Database connection issues

### Frontend Logs (Browser Console)
Monitor for:
- ✅ API URL configuration
- ✅ Network requests
- ✅ CORS errors
- ✅ Application submission errors

## ✅ Success Indicators

After deployment, you should see:

1. **Job Applications**:
   - ✅ Applications submit successfully
   - ✅ Applications saved to database
   - ✅ User receives confirmation email
   - ✅ Admin receives notification email

2. **Admin Login**:
   - ✅ OTP email sent successfully
   - ✅ OTP verification works
   - ✅ Admin can access dashboard

3. **Email Notifications**:
   - ✅ All emails sent successfully
   - ✅ No email errors in logs
   - ✅ Emails received by recipients

## 🆘 Need Help?

1. Check `DEPLOYMENT_ENV_VARIABLES.md` for detailed environment variable setup
2. Check `PRODUCTION_FIXES_SUMMARY.md` for detailed fix information
3. Check Render logs for specific error messages
4. Check browser console for frontend errors
5. Verify all environment variables are set correctly

## 🎉 Expected Results

After completing these steps:
- ✅ Job applications will submit successfully
- ✅ Email notifications will work
- ✅ Admin OTP login will work
- ✅ All functionality will work in production

---

**Last Updated**: [Current Date]
**Status**: Ready for deployment


