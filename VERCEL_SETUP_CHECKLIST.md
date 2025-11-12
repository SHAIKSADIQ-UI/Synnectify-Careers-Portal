# Vercel Setup Checklist - Based on Your Dashboard

## 📊 Current Status Analysis

### ✅ What I See in Your Vercel Dashboard:

1. **Project Name:** `synnectify-careers-portal` ✅
2. **Vercel URL:** `synnectify-careers-portal.vercel.app` ✅
3. **Deployment Status:** Ready ✅
4. **Latest Commit:** "Fix connection issues between frontend and backend - Add timeout handl..." ✅

### ⚠️ What Needs to Be Done:

## 🔧 Step-by-Step: Add Environment Variable in Vercel

### Step 1: Navigate to Environment Variables
1. In your Vercel dashboard (the page you're currently viewing)
2. Click on **"Settings"** tab (visible in the top navigation bar, to the right of "Flags")
3. In the left sidebar, click **"Environment Variables"**

### Step 2: Add VITE_API_URL
1. Click the **"Add New"** button (usually at the top right)
2. Fill in the form:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://synnectify-backend.onrender.com/api`
   - **Environment:** Select all three:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
3. Click **"Save"**

### Step 3: Redeploy Application
**Important:** After adding environment variables, you MUST redeploy for changes to take effect.

1. Go back to **"Overview"** or **"Deployments"** tab
2. Find your latest deployment (the one showing "Ready")
3. Click the **three dots (⋯)** menu on that deployment
4. Click **"Redeploy"**
5. Wait for deployment to complete (usually 1-2 minutes)

## ✅ Verification Steps

### After Adding VITE_API_URL and Redeploying:

1. **Check Browser Console:**
   - Visit: `https://synnectify-careers-portal.vercel.app`
   - Open browser DevTools (F12)
   - Go to **Console** tab
   - Look for:
     ```
     🔗 API URL: https://synnectify-backend.onrender.com/api
     🔗 VITE_API_URL: https://synnectify-backend.onrender.com/api
     ```

2. **Test API Connection:**
   - Go to **Network** tab in DevTools
   - Try to submit a job application or navigate to Careers page
   - Check if API calls are going to: `https://synnectify-backend.onrender.com/api/...`
   - Verify no CORS errors appear

3. **Test Job Application:**
   - Go to Careers page
   - Fill out and submit a test application
   - Verify it submits successfully
   - Check that you receive confirmation email

## 🔗 Complete Environment Variables Summary

### Render (Backend) - Already Set ✅
Based on your previous screenshot, you have:
- `CLIENT_URL` = `https://synnectify-careers-portal.vercel.app/` (needs trailing slash removed)
- `EMAIL_USER` = `careers.synnectify@gmail.com`
- `EMAIL_PASSWORD` = (Gmail App Password)
- `JWT_SECRET` = (your secret)
- `MONGO_URI` = (MongoDB connection)
- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `465`

### Render (Backend) - Need to Add ⚠️
- `FRONTEND_URL` = `https://synnectify-careers-portal.vercel.app` (no trailing slash)
- `NODE_ENV` = `production`

### Vercel (Frontend) - Need to Add ⚠️
- `VITE_API_URL` = `https://synnectify-backend.onrender.com/api`

## 🎯 Quick Action Items

### In Render Dashboard:
1. [ ] Fix `CLIENT_URL` (remove trailing `/`)
2. [ ] Add `FRONTEND_URL` = `https://synnectify-careers-portal.vercel.app`
3. [ ] Add `NODE_ENV` = `production`
4. [ ] Restart Render service

### In Vercel Dashboard (Current Page):
1. [ ] Go to Settings → Environment Variables
2. [ ] Add `VITE_API_URL` = `https://synnectify-backend.onrender.com/api`
3. [ ] Select all environments (Production, Preview, Development)
4. [ ] Save
5. [ ] Redeploy application

## 🐛 Common Issues

### If Environment Variable Doesn't Work After Redeploy:
1. **Check Variable Name:** Must be exactly `VITE_API_URL` (case-sensitive)
2. **Check Value:** Must be exactly `https://synnectify-backend.onrender.com/api`
3. **Check Environments:** Make sure you selected Production
4. **Force Redeploy:** Sometimes need to trigger a new deployment

### If API Calls Still Fail:
1. Check browser console for actual API URL being used
2. Verify backend is accessible: `curl https://synnectify-backend.onrender.com/api/ping`
3. Check CORS errors in browser console
4. Verify Render has correct `CLIENT_URL` and `FRONTEND_URL`

## 📝 Notes

- **Vercel URL:** `synnectify-careers-portal.vercel.app` ✅ (confirmed from your dashboard)
- **Render Backend URL:** `https://synnectify-backend.onrender.com/api` (needs to be set in Vercel)
- **Environment Variables:** Must be set before deployment, or redeploy after adding
- **Redeploy Required:** Always redeploy after adding/changing environment variables

---

**Last Updated:** Based on your current Vercel dashboard
**Status:** Ready to configure environment variables

