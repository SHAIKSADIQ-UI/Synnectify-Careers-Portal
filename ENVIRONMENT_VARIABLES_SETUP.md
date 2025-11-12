# Environment Variables Setup Guide

## 📋 Render Environment Variables (Backend)

### Current Status (Based on Your Screenshot)

✅ **Already Set:**
- `MONGO_URI` - MongoDB connection string
- `EMAIL_USER` - `careers.synnectify@gmail.com`
- `EMAIL_PASSWORD` - Gmail App Password
- `JWT_SECRET` - Secret key
- `CLIENT_URL` - `https://synnectify-careers-portal.vercel.app/`
- `SMTP_HOST` - `smtp.gmail.com`
- `SMTP_PORT` - `465`
- `EMAIL_FROM` - `SYNNECTIFY Careers <careers.synnectify@gmail.com>`
- `EMAIL_REPLY_TO` - `careers.synnectify@gmail.com`
- `PORT` - `5000`

### ⚠️ Required Changes

#### 1. Fix CLIENT_URL (Remove Trailing Slash)
- **Current:** `https://synnectify-careers-portal.vercel.app/`
- **Should be:** `https://synnectify-careers-portal.vercel.app`
- **Action:** Click the eye icon to show value, click edit, remove the trailing `/`

#### 2. Add FRONTEND_URL
- **Key:** `FRONTEND_URL`
- **Value:** `https://synnectify-careers-portal.vercel.app` (no trailing slash)
- **Action:** Click "+ Add Environment Variable" button, enter key and value

#### 3. Add NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Action:** Click "+ Add Environment Variable" button, enter key and value

### 📝 Complete Render Environment Variables List

After updates, you should have:

```
CLIENT_URL=https://synnectify-careers-portal.vercel.app
FRONTEND_URL=https://synnectify-careers-portal.vercel.app
EMAIL_FROM=SYNNECTIFY Careers <careers.synnectify@gmail.com>
EMAIL_PASSWORD=zhwi kqbh khrh vkcq
EMAIL_REPLY_TO=careers.synnectify@gmail.com
EMAIL_USER=careers.synnectify@gmail.com
JWT_SECRET=05a3c8413e7ae0b0c4be290b58d8cf5ebef71b0084cd33fe3967cdf077ffe525
MONGO_URI=mongodb+srv://synnectify_user:Synnectify-Careers_2906@synnectify.0xtysna.mongodb.net/it_website_db?
NODE_ENV=production
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

## 🚀 Vercel Environment Variables (Frontend)

### Required Variable

#### VITE_API_URL
- **Key:** `VITE_API_URL`
- **Value:** `https://synnectify-backend.onrender.com/api`
- **Environments:** Production, Preview, Development (select all)

### How to Add in Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `synnectify-careers-portal`
3. Click **Settings** (gear icon in top navigation)
4. Click **Environment Variables** in the left sidebar
5. Click **Add New** button
6. Enter:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://synnectify-backend.onrender.com/api`
   - **Environment:** Select all (Production, Preview, Development)
7. Click **Save**
8. **Important:** Redeploy your application:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

## 🔍 Verification Steps

### After Updating Render Variables

1. **Restart Render Service:**
   - Go to Render dashboard
   - Click on your `synnectify-backend` service
   - Click **Manual Deploy** → **Deploy latest commit** (or just restart)

2. **Check Render Logs:**
   - Go to **Logs** tab in Render
   - Look for:
     - ✅ "MongoDB Connected Successfully"
     - ✅ "Email: Configured"
     - ✅ "CORS: X origins allowed"
     - ✅ "🔒 CORS Configuration:"
     - ✅ "  - CLIENT_URL: https://synnectify-careers-portal.vercel.app"
     - ✅ "  - FRONTEND_URL: https://synnectify-careers-portal.vercel.app"

3. **Test Backend:**
   ```bash
   curl https://synnectify-backend.onrender.com/api/ping
   ```
   Should return: `{"status":"active",...}`

### After Updating Vercel Variables

1. **Check Browser Console:**
   - Open your Vercel deployment URL
   - Open browser DevTools (F12)
   - Go to **Console** tab
   - Look for:
     - ✅ "🔗 API URL: https://synnectify-backend.onrender.com/api"
     - ✅ "🔗 VITE_API_URL: https://synnectify-backend.onrender.com/api"

2. **Test API Connection:**
   - Open **Network** tab in DevTools
   - Try submitting a job application
   - Check if API calls go to: `https://synnectify-backend.onrender.com/api/...`
   - Verify no CORS errors

## 🎯 Quick Checklist

### Render (Backend)
- [ ] Fix `CLIENT_URL` (remove trailing slash)
- [ ] Add `FRONTEND_URL` = `https://synnectify-careers-portal.vercel.app`
- [ ] Add `NODE_ENV` = `production`
- [ ] Restart Render service
- [ ] Verify logs show correct configuration

### Vercel (Frontend)
- [ ] Add `VITE_API_URL` = `https://synnectify-backend.onrender.com/api`
- [ ] Redeploy Vercel application
- [ ] Verify browser console shows correct API URL
- [ ] Test API connection

## 🐛 Troubleshooting

### If CORS Errors Persist
1. Verify `CLIENT_URL` and `FRONTEND_URL` match exactly (no trailing slash)
2. Check Render logs for CORS configuration
3. Verify your Vercel URL matches exactly

### If API Calls Fail
1. Verify `VITE_API_URL` is set correctly in Vercel
2. Check browser console for API URL
3. Verify backend is accessible: `curl https://synnectify-backend.onrender.com/api/ping`

### If Emails Don't Send
1. Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
2. Check Render logs for email errors
3. Test email: `curl https://synnectify-backend.onrender.com/api/test-email-config`

---

**Last Updated:** Based on your current Render configuration

