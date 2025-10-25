# ✅ SYNNECTIFY Career Portal - Final Setup Checklist

## 📋 Pre-Deployment Checklist

Use this checklist to ensure everything is configured correctly before running the system.

---

## 🔧 **Step 1: Environment Setup**

### Backend Environment (`server/.env`)

```bash
cd server
cp .env.example .env
```

Fill in the following values:

- [ ] `MONGODB_URI` - Your MongoDB connection string
  ```
  Local: mongodb://localhost:27017/synnectify-careers
  Atlas: mongodb+srv://username:password@cluster.mongodb.net/synnectify-careers
  ```

- [ ] `PORT` - Server port (default: 5000)
  ```
  PORT=5000
  ```

- [ ] `CLIENT_URL` - Frontend URL
  ```
  Development: http://localhost:5173
  Production: https://your-domain.com
  ```

- [ ] `JWT_SECRET` - Random secure string
  ```
  JWT_SECRET=your_super_secret_random_string_here
  ```

- [ ] `EMAIL_USER` - Company email
  ```
  EMAIL_USER=careers.synnectify@gmail.com
  ```

- [ ] `EMAIL_PASS` - Gmail App Password (16 characters)
  ```
  EMAIL_PASS=abcd efgh ijkl mnop
  ```
  
  **How to get Gmail App Password:**
  1. Go to https://myaccount.google.com/security
  2. Enable 2-Step Verification
  3. Go to https://myaccount.google.com/apppasswords
  4. Select "Mail" and generate password
  5. Copy 16-character code

- [ ] `SMTP_HOST` - Email server
  ```
  SMTP_HOST=smtp.gmail.com
  ```

- [ ] `SMTP_PORT` - Email port
  ```
  SMTP_PORT=465
  ```

### Frontend Environment (`.env` in root)

```bash
# Create .env in root directory
```

Fill in the following values:

- [ ] `VITE_API_URL` - Backend API URL
  ```
  VITE_API_URL=http://localhost:5000/api
  ```

- [ ] `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID
  ```
  VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
  ```
  
  **How to get Google Client ID:**
  1. Go to https://console.cloud.google.com/
  2. Create new project or select existing
  3. Enable "Google+ API"
  4. Go to Credentials → Create Credentials → OAuth Client ID
  5. Application type: Web application
  6. Add Authorized JavaScript origins: `http://localhost:5173`
  7. Add Authorized redirect URIs: `http://localhost:5173`
  8. Copy Client ID

---

## 📦 **Step 2: Install Dependencies**

### Root (Frontend)
```bash
npm install
```

- [ ] Dependencies installed successfully
- [ ] No error messages

### Server (Backend)
```bash
cd server
npm install
cd ..
```

- [ ] Dependencies installed successfully
- [ ] No error messages

---

## 🗄️ **Step 3: Database Setup**

### Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas**
- [ ] Created cluster on https://cloud.mongodb.com/
- [ ] Added database user
- [ ] Whitelisted IP address (0.0.0.0/0 for development)
- [ ] Copied connection string to `MONGODB_URI`

### Verify Connection
```bash
cd server
node -e "require('./config/db').connectDB().then(() => console.log('✅ DB Connected')).catch(e => console.error('❌ Error:', e))"
```

- [ ] Database connected successfully

### Seed Sample Data (Optional)
```bash
cd server
node seed.js
```

- [ ] Sample jobs created

---

## 🚀 **Step 4: Start Services**

### Terminal 1: Backend Server
```bash
cd server
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
MongoDB connected successfully
```

- [ ] Server started on port 5000
- [ ] No error messages
- [ ] MongoDB connected

### Terminal 2: Frontend Application
```bash
npm run dev
```

**Expected output:**
```
VITE v4.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

- [ ] Frontend started on port 5173
- [ ] No error messages
- [ ] Can access http://localhost:5173

---

## ✅ **Step 5: Feature Testing**

### Test 1: Browse Website
- [ ] Open http://localhost:5173
- [ ] Home page loads correctly
- [ ] **No login button visible in header** ✅
- [ ] Can navigate to About, Services, Portfolio, Contact
- [ ] All pages load without errors

### Test 2: Careers Page
- [ ] Navigate to `/careers`
- [ ] Job listings are visible
- [ ] "Apply Now" button shows on each job
- [ ] "View Details" expands job information

### Test 3: Google OAuth Login
- [ ] Click "Apply Now" on any job
- [ ] Google login popup appears
- [ ] Can select Google account
- [ ] After login, redirects to application form
- [ ] No errors in console

### Test 4: User Profile
- [ ] After login, **user profile picture appears in header** ✅
- [ ] Profile picture is from Google account
- [ ] Click profile → dropdown menu appears
- [ ] Dropdown shows:
  - [ ] User name
  - [ ] User email
  - [ ] "Dashboard" button
  - [ ] "Logout" button

### Test 5: Application Form
- [ ] Form opens with job position pre-filled
- [ ] **First name and email auto-filled from Google** ✅
- [ ] Can fill all required fields:
  - [ ] First Name (auto-filled)
  - [ ] Last Name
  - [ ] Email (auto-filled)
  - [ ] Phone
  - [ ] Date of Birth
  - [ ] LinkedIn (optional)
  - [ ] Resume upload (PDF/DOC/DOCX, max 5MB)
- [ ] Form validation works
- [ ] Can submit form successfully

### Test 6: Email Notifications

**After submitting application:**

- [ ] **Email received at `careers.synnectify@gmail.com`** ✅
  - [ ] Contains applicant name
  - [ ] Contains applicant email
  - [ ] Contains phone number
  - [ ] Contains position applied for
  - [ ] Contains application date
  - [ ] Has SYNNECTIFY branding
  
- [ ] **Confirmation email received at user's email** ✅
  - [ ] Personalized with user's name
  - [ ] Shows position applied for
  - [ ] Shows "Pending Review" status
  - [ ] Has SYNNECTIFY gradient header
  - [ ] Has company contact email
  - [ ] Professional formatting

### Test 7: User Dashboard
- [ ] Click profile → Dashboard
- [ ] Redirects to `/dashboard`
- [ ] Shows personalized welcome with user's name
- [ ] "My Applications" section shows:
  - [ ] Previously submitted applications
  - [ ] Position name
  - [ ] Application date
  - [ ] Status badge (Pending/Shortlisted/Rejected)
- [ ] "Available Job Openings" section shows:
  - [ ] All open positions
  - [ ] Job details (title, description, location, type)
  - [ ] "Apply Now" button on each job

### Test 8: Admin Dashboard Access

**Create admin user first:**
```bash
# In MongoDB shell or Compass
db.users.insertOne({
  email: "admin@synnectify.com",
  password: "$2b$10$hashed_password_here",
  role: "admin"
})
```

- [ ] Admin user created in database
- [ ] Can login as admin
- [ ] Navigate to `/admin`
- [ ] Admin dashboard loads

### Test 9: Admin Features
- [ ] Can view all applications
- [ ] Application cards show:
  - [ ] Applicant name and email
  - [ ] Position applied for
  - [ ] Application date
  - [ ] Status badge
  - [ ] Message/cover letter (if provided)
  - [ ] Link to view resume
- [ ] Statistics section shows:
  - [ ] Total jobs
  - [ ] Total applications
  - [ ] Pending reviews count
- [ ] Can switch between "Applications" and "Jobs" tabs

### Test 10: Status Update Emails

**Shortlist an application:**
- [ ] Click "Shortlist" button on an application
- [ ] Status updates to "Shortlisted" (green badge)
- [ ] **Email sent to applicant** ✅
  - [ ] Congratulations message
  - [ ] Green gradient header
  - [ ] Mentions next steps
  - [ ] Has SYNNECTIFY branding
  - [ ] Shows company contact email

**Reject an application:**
- [ ] Click "Reject" button on an application
- [ ] Status updates to "Rejected" (red badge)
- [ ] **Email sent to applicant** ✅
  - [ ] Professional rejection message
  - [ ] Neutral gray gradient
  - [ ] Encourages future applications
  - [ ] Has SYNNECTIFY branding
  - [ ] Shows company contact email

### Test 11: User Dashboard Status Updates
- [ ] Login as regular user
- [ ] Go to Dashboard
- [ ] Previously shortlisted application shows **green "Shortlisted" badge** ✅
- [ ] Previously rejected application shows **red "Rejected" badge** ✅
- [ ] Status matches what admin set

---

## 🔒 **Step 6: Security Verification**

- [ ] JWT tokens are being created
- [ ] Protected routes require authentication
- [ ] Admin routes require admin role
- [ ] File uploads are validated (type and size)
- [ ] Email addresses are validated
- [ ] CORS is configured correctly
- [ ] Environment variables are not exposed

---

## 🎨 **Step 7: Design Verification**

- [ ] All original animations work
- [ ] Hover effects preserved
- [ ] Gradient backgrounds intact
- [ ] Color scheme consistent
- [ ] Typography matches original
- [ ] Icons display correctly
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No layout breaks

---

## 📧 **Step 8: Email Template Verification**

All emails should have:
- [ ] SYNNECTIFY branding
- [ ] Gradient header (Orange to Blue for most, Green for success, Gray for rejection)
- [ ] Company logo placeholder
- [ ] Responsive HTML design
- [ ] Mobile-friendly
- [ ] Footer with copyright
- [ ] No-reply notice
- [ ] Company contact email link
- [ ] Professional formatting

---

## 🐛 **Step 9: Error Handling**

- [ ] Invalid email shows error message
- [ ] Large resume file (>5MB) rejected
- [ ] Wrong file type (.txt, .jpg) rejected
- [ ] Missing required fields prevented
- [ ] Network errors handled gracefully
- [ ] 404 pages handled
- [ ] Unauthorized access redirected to login

---

## 📊 **Step 10: Data Flow Verification**

```
User Flow:
[ ] User visits website
[ ] Browses careers without login
[ ] Clicks "Apply Now"
[ ] Google login popup
[ ] Login successful
[ ] Redirects to application form
[ ] Form pre-filled with Google data
[ ] Fills remaining fields
[ ] Uploads resume
[ ] Submits application
[ ] Email to careers.synnectify@gmail.com ✅
[ ] Email to user (confirmation) ✅
[ ] Application saved to database
[ ] Application appears in user dashboard
[ ] Application appears in admin dashboard
[ ] Admin changes status
[ ] Email to user (status update) ✅
[ ] Status updated in user dashboard
```

---

## 🎯 **Step 11: Production Readiness**

### Environment Variables
- [ ] All sensitive data in `.env` files
- [ ] `.env` files in `.gitignore`
- [ ] Production values different from development

### Security
- [ ] Strong JWT secret
- [ ] Strong admin password
- [ ] CORS restricted to allowed origins
- [ ] HTTPS enabled (production)

### Performance
- [ ] Images optimized
- [ ] Bundle size reasonable
- [ ] Database indexed (if needed)
- [ ] API responses cached (if needed)

### Monitoring
- [ ] Error logging implemented
- [ ] Email delivery monitoring
- [ ] Application submission tracking

---

## 🎉 **Final Verification**

Run through this complete flow:

1. **User Journey:**
   - [ ] Visit website → Browse careers → Apply → Login → Submit → Get email → Check dashboard → See status

2. **Admin Journey:**
   - [ ] Login as admin → View applications → Update status → Verify email sent

3. **Email Journey:**
   - [ ] Application submitted → 2 emails sent (company + user)
   - [ ] Status updated → 1 email sent (user)

4. **Complete Flow:**
   ```
   User applies for "Senior React Developer"
         ↓
   Email to careers.synnectify@gmail.com ✅
   Email to user@example.com (confirmation) ✅
         ↓
   Admin sees application in dashboard
         ↓
   Admin clicks "Shortlist"
         ↓
   Email to user@example.com (congratulations) ✅
         ↓
   User sees "Shortlisted" badge in dashboard ✅
   ```

---

## ✅ **SUCCESS CRITERIA**

All of the following must be true:

- ✅ **NO login button on home page**
- ✅ Login only triggers on "Apply Now"
- ✅ Google profile picture shows in header after login
- ✅ User dashboard shows application history
- ✅ Admin dashboard shows all applications
- ✅ Email sent to **careers.synnectify@gmail.com** on every application
- ✅ Confirmation email sent to user on application
- ✅ Status update emails sent when admin changes status
- ✅ All emails have SYNNECTIFY branding
- ✅ All original styling and animations preserved

---

## 🆘 **If Something Doesn't Work**

1. Check terminal for error messages
2. Check browser console for errors
3. Verify all `.env` variables are set
4. Ensure MongoDB is running
5. Verify Gmail app password is correct
6. Check Google OAuth is configured
7. Review `CAREERS_SYSTEM_DOCUMENTATION.md`
8. Check `QUICK_START_CAREERS.md`

---

## 📞 **Support**

- **Documentation**: `CAREERS_SYSTEM_DOCUMENTATION.md`
- **Quick Start**: `QUICK_START_CAREERS.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Email**: careers.synnectify@gmail.com

---

## 🎊 **Congratulations!**

If all checkboxes are checked, your SYNNECTIFY Career Portal is:
- ✅ Fully functional
- ✅ Production-ready
- ✅ Professional
- ✅ Automated
- ✅ Branded
- ✅ Secure

**You're ready to start receiving applications! 🚀**

---

**Last Updated**: 2025-01-18  
**Version**: 1.0  
**Status**: Complete ✅
