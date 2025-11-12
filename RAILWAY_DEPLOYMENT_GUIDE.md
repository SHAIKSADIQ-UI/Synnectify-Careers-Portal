# Railway Deployment Guide - Complete Step-by-Step Setup

## 📋 Prerequisites

Before starting, make sure you have:
1. ✅ Railway account (railway.app)
2. ✅ GitHub repository with your code
3. ✅ MongoDB Atlas connection string
4. ✅ Resend API key (get from resend.com - free tier available)
5. ✅ JWT Secret (generate a random string)

---

## 🚀 PART 1: Set Up Backend Service

### Step 1: Create New Railway Project

1. Go to **railway.app**
2. Click **"New Project"** (top right)
3. Select **"Deploy from GitHub repo"**
4. Select your repository: `IT_Website` or your repo name
5. Click **"Deploy Now"**

### Step 2: Configure Backend Service

**You should see one service already created. This is your backend.**

1. **Click on the service** (it might be named "Synnectify-Careers-Portal" or similar)
2. You'll see tabs: **Deployments**, **Variables**, **Metrics**, **Settings**

### Step 3: Set Root Directory (IMPORTANT)

1. Click on **"Settings"** tab
2. Scroll down to **"Root Directory"** section
3. Set Root Directory to: `server`
   - This tells Railway where your backend code is located
4. Scroll down to **"Start Command"**
5. Set Start Command to: `node server.js`
6. Click **"Save"**

### Step 4: Enable Serverless (Optional but Recommended)

1. Still in **"Settings"** tab
2. Find **"Serverless"** section
3. Toggle **"Enable Serverless"** to **ON**
4. Click **"Save"**

### Step 5: Generate Public URL for Backend

1. Still in **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"** button
4. You'll get a URL like: `https://synnectify-careers-portal-production.up.railway.app`
5. **COPY THIS URL** - You'll need it later!
6. This is your backend URL

### Step 6: Set Environment Variables for Backend

1. Click on **"Variables"** tab
2. Click **"New Variable"** button
3. Add each variable one by one:

#### Required Variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

```
JWT_SECRET=your-random-secret-key-min-32-characters-long
```

```
NODE_ENV=production
```

```
RESEND_API_KEY=re_your_resend_api_key_here
```

```
EMAIL_FROM=onboarding@resend.dev
```

**Note:** For CLIENT_URL and FRONTEND_URL, you'll set these AFTER creating the frontend service.

### Step 7: Redeploy Backend

1. Go to **"Deployments"** tab
2. Click the **three dots (⋯)** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (green checkmark)

### Step 8: Test Backend

1. Copy your backend URL (from Step 5)
2. Open in browser: `https://your-backend-url.up.railway.app/api/ping`
3. You should see: `{"status":"active",...}`
4. If you see this, backend is working! ✅

---

## 🌐 PART 2: Set Up Frontend Service

### Step 9: Create Frontend Service

1. In your Railway project dashboard
2. Click **"+ New"** button (top right)
3. Select **"GitHub Repo"** (select the same repo)
4. OR click **"Empty Service"** and connect GitHub manually

### Step 10: Configure Frontend as Static Site

1. Click on the **new service** you just created
2. Go to **"Settings"** tab
3. Find **"Service Type"** or **"Build & Deploy"** section
4. Change service type to **"Static Site"** (if available)
5. OR set these manually:

#### If Static Site Option Available:
- **Root Directory:** Leave empty or set to root
- **Build Command:** `npm ci && npm run build`
- **Output Directory:** `dist`
- **Start Command:** (leave empty for static sites)

#### If Using Regular Service:
- **Root Directory:** Leave empty (root of repo)
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npx serve -s dist -l 3000`

### Step 11: Generate Public URL for Frontend

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"** button
4. You'll get a URL like: `https://synnectify-careers-portal-frontend.up.railway.app`
5. **COPY THIS URL** - This is your frontend URL

### Step 12: Set Environment Variables for Frontend

1. Click on **"Variables"** tab in frontend service
2. Click **"New Variable"** button
3. Add this variable:

```
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

**Replace `your-backend-url` with the actual backend URL from Step 5**

Example:
```
VITE_API_URL=https://synnectify-careers-portal-production.up.railway.app/api
```

### Step 13: Update Backend Variables with Frontend URL

1. Go back to **Backend Service**
2. Click **"Variables"** tab
3. Add these variables:

```
CLIENT_URL=https://your-frontend-url.up.railway.app
```

```
FRONTEND_URL=https://your-frontend-url.up.railway.app
```

**Replace `your-frontend-url` with the actual frontend URL from Step 11**

4. Click **"Save"**

### Step 14: Redeploy Both Services

1. **Backend Service:**
   - Go to **"Deployments"** tab
   - Click **three dots (⋯)** → **"Redeploy"**

2. **Frontend Service:**
   - Go to **"Deployments"** tab
   - Click **three dots (⋯)** → **"Redeploy"**

3. Wait for both deployments to complete

---

## ✅ PART 3: Verify Everything Works

### Step 15: Test Backend API

1. Open browser
2. Go to: `https://your-backend-url.up.railway.app/api/ping`
3. Should see: `{"status":"active","timestamp":"...","environment":"production"}`

### Step 16: Test Frontend

1. Open browser
2. Go to: `https://your-frontend-url.up.railway.app`
3. Open **Developer Tools** (F12)
4. Go to **Console** tab
5. You should see: `🔗 API URL: https://your-backend-url.up.railway.app/api`
6. If you see this, frontend is connected to backend! ✅

### Step 17: Test Application Submission

1. Go to your frontend URL
2. Navigate to **Careers** page
3. Click **"Apply"** on any job
4. Fill out the application form
5. Submit the application
6. Check:
   - ✅ Application submits successfully
   - ✅ Success message appears
   - ✅ Application saved in MongoDB (check MongoDB Atlas)
   - ✅ Email sent (check Resend dashboard)

### Step 18: Test Admin Login

1. Go to your frontend URL
2. Navigate to **Admin Login** page
3. Enter credentials:
   - Email: `careers.synnectify@gmail.com`
   - Password: `Synnectify-Careers_2906`
4. Check:
   - ✅ OTP email is sent (check Resend dashboard)
   - ✅ OTP verification works
   - ✅ Admin dashboard loads

---

## 📝 Complete Environment Variables Checklist

### Backend Service Variables:

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
RESEND_API_KEY=re_...
EMAIL_FROM=onboarding@resend.dev
CLIENT_URL=https://your-frontend-url.up.railway.app
FRONTEND_URL=https://your-frontend-url.up.railway.app
```

### Frontend Service Variables:

```
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

---

## 🎯 Quick Reference: Where to Find Things in Railway

### To Find Your Backend Service:
1. Railway Dashboard → Your Project
2. Look for service with name like "Synnectify-Careers-Portal"
3. Click on it

### To Find Settings:
1. Click on your service
2. Click **"Settings"** tab (top navigation)

### To Find Variables:
1. Click on your service
2. Click **"Variables"** tab (top navigation)

### To Find Public URL:
1. Click on your service
2. Click **"Settings"** tab
3. Scroll to **"Networking"** section
4. Look for **"Public Domain"** or click **"Generate Domain"**

### To Find Deployments:
1. Click on your service
2. Click **"Deployments"** tab (top navigation)
3. See all deployments and logs

### To Redeploy:
1. Go to **"Deployments"** tab
2. Click **three dots (⋯)** on latest deployment
3. Click **"Redeploy"**

---

## 🐛 Troubleshooting

### Backend Not Working:
1. Check **"Logs"** tab for errors
2. Verify **Root Directory** is set to `server`
3. Verify **Start Command** is `node server.js`
4. Check all environment variables are set
5. Verify MongoDB connection string is correct

### Frontend Not Connecting to Backend:
1. Check **VITE_API_URL** is set correctly in frontend variables
2. Verify backend URL is correct (test with `/api/ping`)
3. Check browser console for CORS errors
4. Verify **CLIENT_URL** and **FRONTEND_URL** in backend match frontend URL

### Emails Not Sending:
1. Check **RESEND_API_KEY** is set correctly
2. Verify **EMAIL_FROM** is set
3. Check Resend dashboard for email logs
4. Check backend logs for email errors

### Application Not Submitting:
1. Check browser console for errors
2. Verify **VITE_API_URL** is correct
3. Check backend logs for submission errors
4. Verify MongoDB connection is working

---

## 🎉 Success Indicators

You're done when:
- ✅ Backend URL returns `/api/ping` successfully
- ✅ Frontend loads without errors
- ✅ Browser console shows correct API URL
- ✅ Job applications submit successfully
- ✅ Applications save to MongoDB
- ✅ Emails are sent (check Resend dashboard)
- ✅ Admin login works
- ✅ OTP emails are sent

---

## 📞 Need Help?

If you get stuck:
1. Check Railway logs (click "Logs" tab)
2. Check browser console for errors
3. Verify all environment variables are set
4. Test backend API directly: `https://your-backend-url/api/ping`
5. Check Resend dashboard for email status

---

**Last Updated:** [Current Date]
**Status:** Ready for deployment

