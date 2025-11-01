# 🎯 ADMIN MANAGER - QUICK REFERENCE CARD

## 🔐 LOGIN

**Email**: `admin@synnectify.com`  
**Password**: `admin123456`  
**URL**: http://localhost:5173

---

## 📊 THREE ACTION BUTTONS

### ✅ SHORTLIST (Green)
- **Use for**: Qualified candidates
- **Action**: Changes status to "Shortlisted"
- **Email sent**: ✅ YES - Congratulations email
- **Message**: "🎉 Congratulations! You have been shortlisted..."

### ❌ REJECT (Red)
- **Use for**: Not qualified
- **Action**: Changes status to "Rejected"
- **Email sent**: ✅ YES - Polite rejection email
- **Message**: "Thank you for applying. After careful consideration..."

### 👁️ IGNORE (Gray)
- **Use for**: Spam, incomplete, duplicates
- **Action**: Changes status to "Ignored"
- **Email sent**: ❌ NO - Silent action
- **Message**: No email sent to applicant

---

## 📧 EMAIL TIMELINE

### 1. User Submits Application
```
✉️ Email to Applicant: "Application Received - Pending Review"
✉️ Email to HR: careers.synnectify@gmail.com (notification)
```

### 2. You Click "Shortlist"
```
✉️ Email to Applicant: "Congratulations! You have been shortlisted"
```

### 3. You Click "Reject"
```
✉️ Email to Applicant: "Thank you for applying... not moving forward"
```

### 4. You Click "Ignore"
```
❌ NO EMAIL SENT (Silent)
```

---

## 🚀 START COMMANDS

```bash
# View database
cd server && node view_database.js

# Create admin (one-time)
cd server && node create_admin.js

# Start backend
cd server && npm run dev

# Start frontend
npm run dev
```

---

## 📋 DASHBOARD FEATURES

**Applications Tab**:
- View all applications
- See applicant details
- View resumes (click "View Resume →")
- Read cover messages
- See color-coded status badges
- Use 3 action buttons

**Jobs Tab**:
- View all job postings
- Delete jobs

**Statistics**:
- Total jobs
- Total applications
- Pending applications

---

## 🏷️ STATUS BADGES

- 🟡 **Yellow** = Pending (new, awaiting action)
- 🟢 **Green** = Shortlisted (approved by you, email sent)
- 🔴 **Red** = Rejected (declined by you, email sent)
- ⚪ **Gray** = Ignored (spam, NO email sent)

---

## 🎬 WORKFLOW

```
1. New application arrives
   ↓
2. Check Admin Dashboard
   ↓
3. View applicant details
   ↓
4. Click Resume to check qualifications
   ↓
5. Make decision:
   • Qualified? → Shortlist (email sent)
   • Not qualified? → Reject (email sent)
   • Spam? → Ignore (no email)
```

---

## 📁 FILE LOCATIONS

- **Resumes**: `server/uploads/`
- **Database**: MongoDB `it_website_db`
- **Dashboard**: `src/pages/AdminDashboard.tsx`
- **API**: `server/routes/applications.js`

---

## 🛠️ QUICK TROUBLESHOOTING

**Can't see applications?**
→ Check servers running, run `node server/view_database.js`

**Emails not sending?**
→ Check `server/.env` has EMAIL_PASS configured

**Can't login as admin?**
→ Run `node server/create_admin.js`

---

## 📞 CONTACT EMAILS

- **No-reply sender**: noreply@synnectify.com
- **HR email**: careers.synnectify@gmail.com

---

## ✅ REMEMBER

**Shortlist** = Email sent ✉️  
**Reject** = Email sent ✉️  
**Ignore** = NO email ❌  

**All original website features unchanged!**

---

**Status**: ✅ Ready to Use  
**Last Updated**: 2025-10-18
