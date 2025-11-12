# Deployment Environment Variables Guide

This document outlines all the environment variables required for deploying the SYNNECTIFY Careers Portal to production.

## 🔧 Render (Backend) Environment Variables

Set these in your Render dashboard under your backend service → Environment:

### Required Variables

```bash
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  # Gmail App Password (not regular password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

# Optional Email Configuration
EMAIL_FROM=SYNNECTIFY Careers <your-email@gmail.com>
EMAIL_REPLY_TO=careers.synnectify@gmail.com

# JWT Secret (generate a random string)
JWT_SECRET=your-random-secret-key-here

# Frontend URL (Vercel deployment URL)
CLIENT_URL=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app

# Node Environment
NODE_ENV=production

# Port (Render sets this automatically, but you can override)
PORT=10000
```

### Setting up Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (spaces don't matter)
6. Use this as your `EMAIL_PASSWORD` in Render

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Go to **Database Access** and create a user
4. Go to **Network Access** and add `0.0.0.0/0` to allow all IPs (or add Render's IP ranges)
5. Click **Connect** → **Connect your application**
6. Copy the connection string and replace `<password>` with your user password
7. Use this as your `MONGO_URI` in Render

## 🚀 Vercel (Frontend) Environment Variables

Set these in your Vercel dashboard under your project → Settings → Environment Variables:

### Required Variables

```bash
# Backend API URL (Render backend URL)
VITE_API_URL=https://synnectify-backend.onrender.com/api

# Firebase Configuration (if using Firebase)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 📋 Environment Variables Checklist

### Backend (Render)
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `EMAIL_USER` - Gmail address for sending emails
- [ ] `EMAIL_PASSWORD` - Gmail App Password
- [ ] `JWT_SECRET` - Random secret for JWT tokens
- [ ] `CLIENT_URL` - Frontend Vercel URL
- [ ] `FRONTEND_URL` - Frontend Vercel URL (same as CLIENT_URL)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `SMTP_HOST` - Optional (defaults to smtp.gmail.com)
- [ ] `SMTP_PORT` - Optional (defaults to 465)
- [ ] `EMAIL_FROM` - Optional (defaults to EMAIL_USER)
- [ ] `EMAIL_REPLY_TO` - Optional (defaults to careers.synnectify@gmail.com)

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Backend API URL (Render URL)
- [ ] `VITE_FIREBASE_*` - All Firebase configuration variables (if using Firebase)

## 🔍 Verifying Environment Variables

### Backend (Render)
After deployment, check the logs in Render to verify:
1. MongoDB connection: Look for "MongoDB Connected Successfully"
2. Email configuration: Look for "Email: Configured" in startup logs
3. CORS configuration: Check that your frontend URL is listed

### Frontend (Vercel)
1. Check browser console for API URL logs
2. Verify API calls are going to the correct backend URL
3. Check Network tab in browser DevTools to see if requests are successful

## 🐛 Troubleshooting

### Email Not Sending
1. Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly
2. Ensure you're using a Gmail App Password, not your regular password
3. Check that 2-Step Verification is enabled on your Google account
4. Check Render logs for email error messages
5. Test email configuration using: `GET https://your-backend.onrender.com/api/test-email-config`

### CORS Errors
1. Verify `CLIENT_URL` and `FRONTEND_URL` are set to your exact Vercel URL
2. Include `https://` in the URL
3. Check Render logs for CORS blocking messages
4. Verify the frontend is making requests to the correct backend URL

### MongoDB Connection Issues
1. Verify `MONGO_URI` is correct
2. Check that your IP is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for all IPs)
3. Ensure the database user has proper permissions
4. Check Render logs for connection error messages

### API Calls Failing
1. Verify `VITE_API_URL` is set correctly in Vercel
2. Check that the backend URL includes `/api` at the end
3. Verify the backend is running and accessible
4. Check browser console for CORS or network errors
5. Verify CORS configuration allows your Vercel domain

## 📝 Notes

- **Never commit `.env` files to Git** - They contain sensitive credentials
- **Use different JWT_SECRET for production** - Don't use the default 'dev_secret'
- **Gmail App Passwords are required** - Regular passwords won't work with SMTP
- **MongoDB Atlas requires IP whitelisting** - Add Render's IP ranges or use 0.0.0.0/0
- **Environment variables are case-sensitive** - Use exact variable names as shown
- **Restart services after changing environment variables** - Changes take effect after restart

## 🔐 Security Best Practices

1. Use strong, random JWT_SECRET (minimum 32 characters)
2. Never expose EMAIL_PASSWORD in logs or error messages
3. Use MongoDB Atlas IP whitelisting (avoid 0.0.0.0/0 in production if possible)
4. Regularly rotate App Passwords and JWT_SECRET
5. Monitor Render and Vercel logs for suspicious activity
6. Use environment-specific variables (production vs development)


