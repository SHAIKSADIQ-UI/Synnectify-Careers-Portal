# ✅ Setup & Verification Checklist

Use this checklist to ensure your Career Portal is properly configured and working.

---

## 📋 Pre-Setup Checklist

- [ ] **Node.js installed** (v16 or higher)
  ```bash
  node --version
  ```

- [ ] **MongoDB installed and running**
  ```bash
  mongosh
  # Should connect successfully
  ```

- [ ] **Google OAuth Client ID obtained**
  - Visit [Google Cloud Console](https://console.cloud.google.com)
  - Create OAuth 2.0 credentials
  - Add `http://localhost:5173` to authorized origins

- [ ] **Gmail App Password generated** (for email notifications - optional)
  - Go to [Google Account Security](https://myaccount.google.com/security)
  - Enable 2-Step Verification
  - Generate App Password

---

## 🔧 Installation Checklist

### Frontend Setup
- [ ] Navigate to `IT_Website` directory
- [ ] Run `npm install`
- [ ] Create `src/.env` file
- [ ] Add `VITE_GOOGLE_CLIENT_ID`
- [ ] Add `VITE_API_URL=http://localhost:5000/api`

### Backend Setup
- [ ] Navigate to `IT_Website/server` directory
- [ ] Run `npm install`
- [ ] Verify `server/.env` file exists
- [ ] Configure `MONGO_URI`
- [ ] Configure `JWT_SECRET` (change from default!)
- [ ] Configure email settings (optional)

---

## 🌱 Database Setup Checklist

- [ ] **MongoDB is running**
  ```bash
  # Check if MongoDB is running
  mongosh --eval "db.version()"
  ```

- [ ] **Seed sample data** (optional but recommended)
  ```bash
  cd server
  node seed.js
  ```
  Should output: "✅ Inserted 5 sample jobs"

- [ ] **Verify database**
  ```bash
  mongosh
  use itwebsite
  db.jobs.count()
  # Should return 5 if seeded
  ```

---

## 🚀 Server Startup Checklist

### Backend Server
- [ ] Navigate to `server` directory
- [ ] Run `npm run dev`
- [ ] Verify output shows:
  - ✅ "Connected to MongoDB"
  - ✅ "Server running on http://localhost:5000"
- [ ] Test API endpoint:
  ```bash
  curl http://localhost:5000/api/ping
  # Should return: "Server active"
  ```

### Frontend Server
- [ ] Navigate to `IT_Website` directory
- [ ] Run `npm run dev`
- [ ] Verify output shows:
  - ✅ "VITE vX.X.X ready"
  - ✅ "Local: http://localhost:5173"
- [ ] Open browser to `http://localhost:5173`

---

## 🧪 Functionality Testing Checklist

### Pre-Login Page
- [ ] Page loads successfully at `http://localhost:5173`
- [ ] Background image displays
- [ ] "Sign in with Google" button visible and styled
- [ ] Company stats show (50+, 200+, 5+)
- [ ] No console errors in browser DevTools

### Google Authentication
- [ ] Click "Sign in with Google" button
- [ ] Google OAuth popup appears
- [ ] Select Google account
- [ ] Redirect to `/dashboard` after authentication
- [ ] No errors in console

### User Dashboard
- [ ] User profile picture/initials appear in top right
- [ ] Welcome message shows user name
- [ ] "My Applications" section visible
- [ ] "Job Openings" section visible
- [ ] Job cards display properly
- [ ] Can scroll through job listings

### Job Application
- [ ] Click "Apply Now" on any job
- [ ] Application form loads
- [ ] Form fields are pre-filled (name, email)
- [ ] Can upload resume
- [ ] Submit application successfully
- [ ] Email confirmation received (if email configured)
- [ ] Application appears in "My Applications"

### User Profile Dropdown
- [ ] Click profile picture in header
- [ ] Dropdown menu appears
- [ ] Shows user name and email
- [ ] "Dashboard" link works
- [ ] "Logout" button works
- [ ] Clicking outside closes dropdown

### Logout & Re-login
- [ ] Click "Logout"
- [ ] Redirected to pre-login home page
- [ ] Profile picture removed from header
- [ ] Can login again successfully

---

## 👑 Admin Features Checklist

### Create Admin User
- [ ] Login with Google account first
- [ ] Open MongoDB shell:
  ```bash
  mongosh
  use itwebsite
  db.users.updateOne(
    { email: "your-email@gmail.com" },
    { $set: { role: "admin" } }
  )
  ```
- [ ] Verify update:
  ```bash
  db.users.find({ email: "your-email@gmail.com" })
  # Should show role: "admin"
  ```
- [ ] Logout and login again

### Admin Dashboard Access
- [ ] Profile shows "Admin" badge
- [ ] Profile dropdown shows "Admin Panel" option
- [ ] Click "Admin Panel" or navigate to `/admin`
- [ ] Admin dashboard loads successfully

### Admin Functionality
- [ ] Stats display correctly (Total Jobs, Applications, Pending)
- [ ] Can switch between "Applications" and "Jobs" tabs
- [ ] **Applications Tab**:
  - [ ] See all applications from all users
  - [ ] Can click "Shortlist" button
  - [ ] Email sent when shortlisting
  - [ ] Can click "Reject" button
  - [ ] Email sent when rejecting
  - [ ] Application status updates
- [ ] **Jobs Tab**:
  - [ ] See all job postings
  - [ ] Can delete jobs
  - [ ] Job removed from database

### Admin Security
- [ ] Regular users cannot access `/admin` (redirected to `/dashboard`)
- [ ] Backend rejects non-admin API calls with 403 error
- [ ] Admin badge only shows for admin users

---

## 📧 Email Notifications Checklist

### Configuration (Optional)
- [ ] `EMAIL_USER` set in `server/.env`
- [ ] `EMAIL_PASS` set (Gmail App Password)
- [ ] `EMAIL_FROM` configured
- [ ] `EMAIL_REPLY_TO` configured

### Email Testing
- [ ] **Application Received Email**:
  - [ ] Sent immediately after application
  - [ ] Shows job title and details
  - [ ] Professional HTML design
  - [ ] From: "noreply@synnectify.com"
  - [ ] No-reply message in footer

- [ ] **Shortlisted Email**:
  - [ ] Sent when admin clicks "Shortlist"
  - [ ] Congratulatory message
  - [ ] Professional design
  - [ ] Contact info included

- [ ] **Rejected Email**:
  - [ ] Sent when admin clicks "Reject"
  - [ ] Polite rejection message
  - [ ] Professional tone
  - [ ] Encouragement included

---

## 🎨 UI/UX Checklist

### Design Consistency
- [ ] Orange (#f97316) and Blue (#3b82f6) colors used throughout
- [ ] Typography consistent
- [ ] Spacing and padding uniform
- [ ] All buttons have hover effects
- [ ] Smooth transitions (300ms)

### Responsive Design
- [ ] Test on desktop (1920px width)
- [ ] Test on laptop (1440px width)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width)
- [ ] All components adapt properly
- [ ] No horizontal scroll
- [ ] Touch-friendly buttons on mobile

### Loading States
- [ ] Dashboard shows loading spinner while fetching jobs
- [ ] Login shows "Signing you in..." message
- [ ] Form submission shows loading state
- [ ] No blank screens during async operations

### Error Handling
- [ ] Login failure shows error message
- [ ] API errors display user-friendly messages
- [ ] Form validation works
- [ ] Network errors handled gracefully

---

## 🔒 Security Checklist

### Authentication
- [ ] JWT tokens stored in localStorage
- [ ] Tokens include role information
- [ ] Tokens expire after 7 days
- [ ] Protected routes check authentication
- [ ] Unauthenticated users redirected to login

### Authorization
- [ ] Admin routes check role
- [ ] Backend validates JWT on protected endpoints
- [ ] Non-admin users cannot access admin API
- [ ] Role tampering in localStorage doesn't work (backend validates)

### Data Protection
- [ ] Passwords not stored (Google OAuth only)
- [ ] JWT secret is strong (change default!)
- [ ] CORS configured properly
- [ ] No sensitive data in console logs

---

## 🐛 Debugging Checklist

If something doesn't work, check:

### Backend Issues
- [ ] MongoDB is running: `mongosh`
- [ ] Server logs show no errors
- [ ] Port 5000 is not in use by another app
- [ ] Environment variables loaded correctly
- [ ] Database has sample data: `db.jobs.find()`

### Frontend Issues
- [ ] Browser console shows no errors
- [ ] Google Client ID is correct
- [ ] API URL points to correct backend
- [ ] Port 5173 is not in use
- [ ] Cache cleared (Ctrl+Shift+R)

### Email Issues
- [ ] Gmail App Password correct (not regular password!)
- [ ] Server logs show email sending attempts
- [ ] Check spam folder
- [ ] Try with another email provider

### Common Fixes
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Restart backend server
- [ ] Restart frontend server
- [ ] Clear browser cache
- [ ] Try incognito mode
- [ ] Check firewall settings

---

## 📊 Performance Checklist

- [ ] Page loads in < 3 seconds
- [ ] Images optimized
- [ ] API responses < 500ms
- [ ] No memory leaks in console
- [ ] Smooth animations (60fps)
- [ ] No layout shifts during load

---

## 🚀 Production Readiness Checklist

Before deploying to production:

### Security
- [ ] Change `JWT_SECRET` to strong random string (32+ characters)
- [ ] Use environment-specific `.env` files
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Configure CORS whitelist
- [ ] Remove console.log statements

### Database
- [ ] Use MongoDB Atlas (cloud database)
- [ ] Set up automated backups
- [ ] Configure database indexes
- [ ] Set up monitoring and alerts

### Email
- [ ] Use professional email service (SendGrid, AWS SES)
- [ ] Configure SPF/DKIM/DMARC records
- [ ] Set up custom domain email
- [ ] Test email deliverability

### Hosting
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Backend deployed (Heroku/Railway/AWS)
- [ ] Domain name configured
- [ ] SSL certificate installed
- [ ] CDN configured for static assets

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Configure logging service

---

## ✅ Final Verification

Run through complete user journey one more time:

**As User:**
1. [ ] Visit homepage → Login → View jobs → Apply → Logout

**As Admin:**
1. [ ] Login → Access admin panel → Review applications → Update status → Manage jobs

**Check Email:**
1. [ ] Application confirmation received
2. [ ] Status update emails received
3. [ ] All emails render properly

---

## 🎉 Success!

If all items are checked, your **SYNNECTIFY Career Portal** is fully operational!

### Next Steps:
1. Read [QUICK_START.md](./QUICK_START.md) for daily usage
2. Review [UPGRADE_DOCUMENTATION.md](./UPGRADE_DOCUMENTATION.md) for details
3. Check [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for technical overview

---

**Need Help?**
- 📧 Email: hr@synnectify.com
- 📚 Docs: See README files in project root

**Happy Career Portal Managing! 🚀**
