# 🔐 SYNNECTIFY Admin Manager Guide

## 📋 Table of Contents
1. [Admin Login](#admin-login)
2. [View Applications](#view-applications)
3. [Manage Application Status](#manage-application-status)
4. [Email Notifications](#email-notifications)
5. [View Jobs](#view-jobs)
6. [Troubleshooting](#troubleshooting)

---

## 🔑 Admin Login

### Step 1: Create Admin Account
Run this command once to create your admin account:

```bash
cd server
node create_admin.js
```

**Default Credentials**:
- **Email**: `admin@synnectify.com`
- **Password**: `admin123456`

⚠️ **Change the password after first login!**

### Step 2: Access Admin Dashboard

1. Go to: `http://localhost:5173`
2. Click **"Sign in with Google"** or use the login form
3. Login with the admin email created above
4. You will be automatically redirected to the Admin Dashboard

**Admin Dashboard URL**: `http://localhost:5173/admin`

---

## 📊 View Applications

### Applications Tab

On the Admin Dashboard, you'll see:

**Statistics**:
- ✅ Total Jobs Posted
- ✅ Total Applications Received
- ✅ Pending Applications Count

**Application Details**:
Each application shows:
- 👤 Applicant Name
- 📧 Email Address
- 💼 Position Applied For
- 📅 Application Date
- 💬 Cover Message (if provided)
- 📄 Resume Link (click to view/download)
- 🏷️ Current Status (Pending/Shortlisted/Rejected/Ignored)

---

## ⚙️ Manage Application Status

You have **3 action buttons** for each application:

### 1. ✅ Shortlist Button (Green)

**What it does**:
- Changes status to "Shortlisted"
- **Sends congratulations email** to applicant
- Email includes: Next steps and HR contact promise

**Email sent**:
```
Subject: Application Status Update - [Position] at SYNNECTIFY
Content: Congratulations! You have been shortlisted...
```

**When to use**: When you want to move the candidate to next round

---

### 2. ❌ Reject Button (Red)

**What it does**:
- Changes status to "Rejected"
- **Sends polite rejection email** to applicant
- Email includes: Thank you message and encouragement

**Email sent**:
```
Subject: Application Status Update - [Position] at SYNNECTIFY
Content: Thank you for applying. After careful consideration...
```

**When to use**: When the candidate doesn't meet requirements

---

### 3. 👁️ Ignore Button (Gray)

**What it does**:
- Changes status to "Ignored"
- **NO EMAIL is sent** to applicant
- Application is marked but applicant isn't notified

**When to use**: 
- Spam applications
- Incomplete applications
- Applications you don't want to respond to

---

## 📧 Email Notifications

### Automatic Emails Sent

#### 1. **On Application Submission**
- ✅ **To Applicant**: Confirmation email with application details
- ✅ **To You (HR)**: New application notification at `careers.synnectify@gmail.com`

#### 2. **On Status Change to "Shortlisted"**
- ✅ **To Applicant**: Congratulations email with next steps
- ✅ Professional green-themed email template

#### 3. **On Status Change to "Rejected"**
- ✅ **To Applicant**: Polite rejection email
- ✅ Professional gray-themed email template
- ✅ Encourages future applications

#### 4. **On Status Change to "Ignored"**
- ⚠️ **No email sent** to applicant
- Silent status change for spam/unwanted applications

### Email Configuration

**Current Setup**:
- **Sender**: noreply@synnectify.com (No-reply address)
- **Reply-To**: careers.synnectify@gmail.com
- **SMTP**: Gmail (smtp.gmail.com:465)

**To Enable Emails**:
See [`EMAIL_SETUP_GUIDE.md`](EMAIL_SETUP_GUIDE.md) for Gmail App Password setup.

---

## 💼 View Jobs

### Jobs Tab

Shows all posted jobs with:
- 📋 Job Title
- 📝 Description
- 📍 Location
- ⏰ Job Type
- 📅 Posted Date
- 🗑️ Delete Button

**To Delete a Job**:
1. Click the red "Delete" button
2. Confirm deletion
3. Job will be removed from database

---

## 🔍 Viewing Applicant Details

### For Each Application:

**Basic Info**:
- Name, Email, Position, Application Date

**View Resume**:
- Click "View Resume →" link
- Opens in new tab
- Resume is stored in `server/uploads/` folder

**Cover Message**:
- Displayed below basic info
- Shows applicant's motivation/message

**Current Status**:
- Color-coded badge:
  - 🟡 Yellow = Pending
  - 🟢 Green = Shortlisted
  - 🔴 Red = Rejected
  - ⚪ Gray = Ignored

---

## 📊 Dashboard Statistics

### Real-time Metrics:

1. **Total Jobs**: Number of active job postings
2. **Total Applications**: All applications received
3. **Pending Review**: Applications waiting for action

These update automatically when you make changes.

---

## 🚀 Quick Actions Workflow

### Processing Applications:

1. **Review Application**:
   - Read applicant details
   - Click "View Resume" to check qualifications
   - Read cover message

2. **Make Decision**:
   - **Qualified?** → Click "Shortlist" (sends email)
   - **Not Qualified?** → Click "Reject" (sends email)
   - **Spam/Incomplete?** → Click "Ignore" (no email)

3. **Confirmation**:
   - Alert popup confirms action
   - Shows what email was sent
   - Status badge updates immediately

---

## 🛠️ Troubleshooting

### Can't Access Admin Dashboard?

**Check**:
1. Are you logged in as admin?
2. Is your user role set to "admin" in database?
3. Run: `node server/create_admin.js` to verify admin exists

### Emails Not Sending?

**Fix**:
1. Check `server/.env` file has EMAIL_PASS filled
2. See `EMAIL_SETUP_GUIDE.md` for Gmail setup
3. Applications still save even if emails fail!

### Can't See Applications?

**Check**:
1. Backend server running: `http://localhost:5000`
2. Frontend running: `http://localhost:5173`
3. MongoDB running and connected
4. Run `node server/view_database.js` to verify data

### Button Not Working?

**Try**:
1. Refresh the page
2. Check browser console (F12) for errors
3. Verify you're logged in with admin account
4. Check backend terminal for error messages

---

## 📁 File Locations

**Admin Dashboard Code**: `src/pages/AdminDashboard.tsx`
**Backend Route**: `server/routes/applications.js`
**Email Templates**: Inside `server/routes/applications.js`
**Uploaded Resumes**: `server/uploads/` folder

---

## 🎯 Summary

As **Synnectify Admin Manager**, you can:

✅ View all job applications in one place
✅ See applicant details and resumes
✅ Shortlist candidates (sends congratulations email)
✅ Reject candidates (sends polite rejection email)
✅ Ignore spam (no email sent)
✅ Manage job postings
✅ Track application statistics

**All automatic email notifications work out of the box!**

---

## 📞 Need Help?

- Check `FINAL_FIXES_COMPLETE.md` for system status
- Check `EMAIL_SETUP_GUIDE.md` for email configuration
- Run `node server/view_database.js` to view all data

---

**Last Updated**: 2025-10-18
**Status**: ✅ Fully Functional
