# Railway Quick Setup - Copy This to ChatGPT

## 🎯 What You Have Now

Based on your Railway dashboard:
- ✅ Project: "Synnectify-Careers-Portal" 
- ✅ One service deployed (this is likely your backend)
- ⚠️ Need to: Configure it properly + Add frontend service

---

## 📍 STEP 1: Identify What Service You Have

**In Railway Dashboard:**
1. Click on "Synnectify-Careers-Portal" service
2. Go to "Settings" tab
3. Check "Root Directory":
   - If it's empty or says "server" → This is your BACKEND ✅
   - If it says something else → This might be frontend

**Most likely:** This is your BACKEND service

---

## 🔧 STEP 2: Configure Backend Service

### A. Set Root Directory
1. Click on your service
2. Click "Settings" tab
3. Find "Root Directory" field
4. Set it to: `server`
5. Click "Save"

### B. Set Start Command
1. Still in "Settings" tab
2. Find "Start Command" field
3. Set it to: `node server.js`
4. Click "Save"

### C. Get Backend URL
1. Still in "Settings" tab
2. Scroll to "Networking" section
3. Click "Generate Domain" button
4. Copy the URL (looks like: `https://xxxxx.up.railway.app`)
5. **THIS IS YOUR BACKEND URL** - Save it!

### D. Add Environment Variables
1. Click "Variables" tab
2. Click "New Variable" button
3. Add these one by one:

```
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key-here
NODE_ENV=production
RESEND_API_KEY=re_your_resend_key
EMAIL_FROM=onboarding@resend.dev
```

**Note:** CLIENT_URL and FRONTEND_URL - we'll add these AFTER creating frontend

### E. Enable Serverless (Optional)
1. Go to "Settings" tab
2. Find "Serverless" section
3. Toggle "Enable Serverless" to ON
4. Click "Save"

### F. Redeploy Backend
1. Go to "Deployments" tab
2. Click three dots (⋯) on latest deployment
3. Click "Redeploy"
4. Wait for green checkmark ✅

---

## 🌐 STEP 3: Create Frontend Service

### A. Create New Service
1. In Railway project dashboard (main page)
2. Click "+ New" button (top right)
3. Select "GitHub Repo"
4. Select your repository
5. Click "Deploy Now"

### B. Configure Frontend
1. Click on the NEW service you just created
2. Go to "Settings" tab
3. Set these:

**Root Directory:** (leave empty - root of repo)
**Build Command:** `npm ci && npm run build`
**Output Directory:** `dist`
**Start Command:** `npx serve -s dist -l $PORT`

### C. Get Frontend URL
1. Still in "Settings" tab
2. Scroll to "Networking" section
3. Click "Generate Domain" button
4. Copy the URL
5. **THIS IS YOUR FRONTEND URL** - Save it!

### D. Add Frontend Environment Variable
1. Click "Variables" tab in frontend service
2. Click "New Variable"
3. Add:

```
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

**Replace `your-backend-url` with the actual backend URL from Step 2C**

### E. Redeploy Frontend
1. Go to "Deployments" tab
2. Click three dots (⋯) → "Redeploy"
3. Wait for green checkmark ✅

---

## 🔗 STEP 4: Connect Backend to Frontend

### A. Update Backend Variables
1. Go back to BACKEND service
2. Click "Variables" tab
3. Add these variables:

```
CLIENT_URL=https://your-frontend-url.up.railway.app
FRONTEND_URL=https://your-frontend-url.up.railway.app
```

**Replace `your-frontend-url` with the actual frontend URL from Step 3C**

### B. Redeploy Backend Again
1. Go to "Deployments" tab
2. Click three dots (⋯) → "Redeploy"
3. Wait for green checkmark ✅

---

## ✅ STEP 5: Test Everything

### Test Backend:
1. Open: `https://your-backend-url.up.railway.app/api/ping`
2. Should see: `{"status":"active",...}`

### Test Frontend:
1. Open: `https://your-frontend-url.up.railway.app`
2. Open browser console (F12)
3. Should see: `🔗 API URL: https://your-backend-url.up.railway.app/api`

### Test Application:
1. Go to Careers page
2. Submit an application
3. Should work! ✅

---

## 📋 Complete Checklist

### Backend Service:
- [ ] Root Directory = `server`
- [ ] Start Command = `node server.js`
- [ ] Public URL generated
- [ ] MONGO_URI set
- [ ] JWT_SECRET set
- [ ] NODE_ENV = production
- [ ] RESEND_API_KEY set
- [ ] EMAIL_FROM set
- [ ] CLIENT_URL set (after frontend created)
- [ ] FRONTEND_URL set (after frontend created)
- [ ] Serverless enabled (optional)
- [ ] Redeployed

### Frontend Service:
- [ ] Service created
- [ ] Build Command = `npm ci && npm run build`
- [ ] Output Directory = `dist`
- [ ] Start Command = `npx serve -s dist -l $PORT`
- [ ] Public URL generated
- [ ] VITE_API_URL set to backend URL
- [ ] Redeployed

### Testing:
- [ ] Backend `/api/ping` works
- [ ] Frontend loads
- [ ] Frontend connects to backend
- [ ] Application submission works
- [ ] Emails are sent
- [ ] Admin login works

---

## 🎯 Where to Find Things in Railway

**To find your service:**
- Railway Dashboard → Click on your project → See services list

**To find Settings:**
- Click on service → Click "Settings" tab

**To find Variables:**
- Click on service → Click "Variables" tab

**To find Public URL:**
- Click on service → Settings → Networking → Generate Domain

**To find Deployments:**
- Click on service → Click "Deployments" tab

**To Redeploy:**
- Deployments tab → Three dots (⋯) → Redeploy

---

## 🚨 Common Issues

**Issue: Service not found**
- Solution: Check you're in the correct Railway project

**Issue: Root Directory not working**
- Solution: Make sure it's exactly `server` (lowercase)

**Issue: Build fails**
- Solution: Check build command is correct

**Issue: Frontend can't connect to backend**
- Solution: Check VITE_API_URL is correct and backend URL is accessible

**Issue: Environment variables not working**
- Solution: Make sure you redeployed after adding variables

---

**Copy this entire document and ask ChatGPT to guide you through each step!**

