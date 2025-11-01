# 📧 EMAIL NOTIFICATION SYSTEM - COMPLETE GUIDE

## 🎯 EMAIL BEHAVIOR SUMMARY

| Action | Email Sent? | To Whom | Email Type |
|--------|-------------|---------|------------|
| User submits application | ✅ YES (2 emails) | Applicant + HR | Confirmation + Notification |
| Admin clicks "Shortlist" | ✅ YES | Applicant | Congratulations |
| Admin clicks "Reject" | ✅ YES | Applicant | Polite Rejection |
| Admin clicks "Ignore" | ❌ NO | Nobody | Silent (no email) |

---

## 📨 EMAIL 1: APPLICATION SUBMISSION (AUTOMATIC)

### To: Applicant

```
From: noreply@synnectify.com
To: applicant@email.com
Subject: Application Received - [Position] at SYNNECTIFY

╔════════════════════════════════════════╗
║         SYNNECTIFY                     ║
║         Career Portal                  ║
╚════════════════════════════════════════╝

✅ Application Received!

Dear [Applicant Name],

Thank you for applying for the position of [Position] 
at SYNNECTIFY. We have successfully received your application.

┌─────────────────────────────────────┐
│ Application Details:                │
│ • Position: [Position]              │
│ • Status: Pending Review            │
│ • Applied On: [Date]                │
└─────────────────────────────────────┘

Our recruitment team will review your application and 
get back to you within 5-7 business days.

Note: This is an automated no-reply email. For inquiries, 
contact careers.synnectify@gmail.com

© 2025 SYNNECTIFY. All rights reserved.
```

### To: HR Manager

```
From: noreply@synnectify.com
To: careers.synnectify@gmail.com
Subject: New Job Application Received - [Position]

╔════════════════════════════════════════╗
║         SYNNECTIFY                     ║
║      New Application Alert             ║
╚════════════════════════════════════════╝

📋 New Application Received

┌─────────────────────────────────────┐
│ Applicant Details:                  │
│ • Name: [Full Name]                 │
│ • Email: [Email]                    │
│ • Phone: [Phone]                    │
│ • DOB: [DOB]                        │
│ • LinkedIn: [LinkedIn]              │
│ • Position: [Position]              │
│ • Application Date: [Date]          │
│ • Message: [Their message]          │
└─────────────────────────────────────┘

📎 Resume attached: Check server uploads folder

© 2025 SYNNECTIFY. All rights reserved.
```

---

## 📨 EMAIL 2: SHORTLIST - CONGRATULATIONS (MANUAL)

**Triggered when**: Admin clicks green "Shortlist" button

**Email sent to**: Applicant only

```
From: noreply@synnectify.com
Reply-To: careers.synnectify@gmail.com
To: applicant@email.com
Subject: Application Status Update - [Position] at SYNNECTIFY

╔════════════════════════════════════════╗
║         SYNNECTIFY                     ║
║         Career Portal                  ║
╚════════════════════════════════════════╝

🎉 Congratulations!

Dear [Applicant Name],

We are pleased to inform you that you have been 
SHORTLISTED for the position of [Position] at SYNNECTIFY.

┌─────────────────────────────────────┐
│ ✅ Next Steps:                      │
│                                     │
│ Our HR team will contact you       │
│ shortly via email or phone with    │
│ details about the next round of    │
│ the recruitment process.           │
└─────────────────────────────────────┘

Please keep an eye on your email and phone for 
further communication from us.

Note: This is an automated no-reply email. For inquiries, 
contact careers.synnectify@gmail.com

© 2025 SYNNECTIFY. All rights reserved.
```

**Email Design**: Green gradient header (success theme)

**Backend logs**: `✅ Email sent for Shortlisted status to [email]`

---

## 📨 EMAIL 3: REJECT - POLITE REJECTION (MANUAL)

**Triggered when**: Admin clicks red "Reject" button

**Email sent to**: Applicant only

```
From: noreply@synnectify.com
Reply-To: careers.synnectify@gmail.com
To: applicant@email.com
Subject: Application Status Update - [Position] at SYNNECTIFY

╔════════════════════════════════════════╗
║         SYNNECTIFY                     ║
║         Career Portal                  ║
╚════════════════════════════════════════╝

Application Update

Dear [Applicant Name],

Thank you for your interest in the [Position] at 
SYNNECTIFY and for taking the time to apply.

After careful consideration, we regret to inform you 
that we will not be moving forward with your application 
at this time. We received many qualified candidates and 
the selection was highly competitive.

We encourage you to apply for future openings that 
match your skills and experience. We wish you the best 
in your job search and future endeavors.

Note: This is an automated no-reply email. For inquiries, 
contact careers.synnectify@gmail.com

© 2025 SYNNECTIFY. All rights reserved.
```

**Email Design**: Gray gradient header (neutral/professional theme)

**Backend logs**: `✅ Email sent for Rejected status to [email]`

---

## 📨 EMAIL 4: IGNORE - NO EMAIL (MANUAL)

**Triggered when**: Admin clicks gray "Ignore" button

**Email sent to**: ❌ NOBODY - NO EMAIL IS SENT

**What happens**:
1. Application status changed to "Ignored" in database
2. NO email sent to applicant (silent action)
3. Admin sees alert: "⚠️ Application ignored. No email will be sent to the applicant."
4. Badge turns gray in dashboard

**Backend logs**: `⚠️ Status set to Ignored - NO EMAIL sent to [email]`

**Use case**: 
- Spam applications
- Incomplete/invalid applications
- Duplicate submissions
- Applications you want to skip without notifying applicant

---

## 🔧 EMAIL CONFIGURATION

### Current Setup (in `server/.env`)

```env
EMAIL_USER=noreply.synnectify@gmail.com
EMAIL_PASS=[Gmail App Password]
EMAIL_FROM=noreply@synnectify.com
EMAIL_NAME=SYNNECTIFY - No Reply
EMAIL_REPLY_TO=careers.synnectify@gmail.com
```

### SMTP Settings

```javascript
Host: smtp.gmail.com
Port: 465
Secure: true (SSL/TLS)
Auth: {
  user: noreply.synnectify@gmail.com
  pass: [Gmail App Password]
}
```

### Email Headers

```
From: "SYNNECTIFY - No Reply" <noreply@synnectify.com>
Reply-To: careers.synnectify@gmail.com
Content-Type: text/html; charset=UTF-8
```

---

## 📊 EMAIL FLOW DIAGRAM

```
USER SUBMITS APPLICATION
         ↓
    ┌────┴────┐
    │         │
    ↓         ↓
Email to    Email to
Applicant   HR Manager
(Confirm)   (Notify)
    │         │
    └────┬────┘
         ↓
   APPLICATION SAVED
   Status: "Pending"
         ↓
    
ADMIN REVIEWS IN DASHBOARD
         ↓
    ┌────┴────┐
    │  DECISION │
    └────┬────┘
         │
    ┌────┼────┐
    │    │    │
    ↓    ↓    ↓
SHORTLIST REJECT IGNORE
    │    │    │
    ↓    ↓    ↓
Email  Email  NO EMAIL
(Congrats) (Sorry) (Silent)
    │    │    │
    ↓    ↓    ↓
Status  Status  Status
Green   Red    Gray
```

---

## 📋 EMAIL CHECKLIST

### ✅ When Application is Submitted:
- [x] Applicant receives confirmation email
- [x] HR receives notification email
- [x] Application saved with "Pending" status
- [x] Both emails are HTML formatted
- [x] Both emails have SYNNECTIFY branding

### ✅ When Admin Clicks "Shortlist":
- [x] Applicant receives congratulations email
- [x] Email has green success theme
- [x] Email includes next steps
- [x] Status changes to "Shortlisted"
- [x] Badge turns green in dashboard
- [x] Button becomes disabled

### ✅ When Admin Clicks "Reject":
- [x] Applicant receives polite rejection email
- [x] Email has professional gray theme
- [x] Email encourages future applications
- [x] Status changes to "Rejected"
- [x] Badge turns red in dashboard
- [x] Button becomes disabled

### ✅ When Admin Clicks "Ignore":
- [x] NO email sent to applicant
- [x] Status changes to "Ignored"
- [x] Badge turns gray in dashboard
- [x] Button becomes disabled
- [x] Backend logs confirm no email sent
- [x] Silent action (applicant not notified)

---

## 🛠️ TROUBLESHOOTING EMAILS

### Emails Not Sending?

**Check 1**: Gmail App Password configured
```bash
# Check .env file
cd server
cat .env | grep EMAIL_PASS
```

**Check 2**: Gmail 2FA enabled
- Go to Google Account settings
- Security > 2-Step Verification
- Must be enabled for App Passwords

**Check 3**: Backend logs
```bash
# Look for email errors
cd server
npm run dev

# Watch for these logs:
# ✅ Email sent for [status] to [email]
# ⚠️ Failed to send email: [error]
```

**Check 4**: Application still saves
- Even if email fails, application is saved
- You can manually contact applicant

### Test Email System

**Quick test**:
1. Submit test application from website
2. Check if confirmation email arrives
3. Check if HR notification arrives at careers.synnectify@gmail.com
4. Check backend terminal for email logs

---

## 📞 EMAIL ADDRESSES

| Purpose | Email Address |
|---------|---------------|
| No-reply sender | noreply@synnectify.com |
| HR notification | careers.synnectify@gmail.com |
| HR reply-to | careers.synnectify@gmail.com |
| SMTP account | noreply.synnectify@gmail.com |

---

## 🎯 SUMMARY

### Automatic Emails (No Admin Action)
1. ✅ **Application Submitted** → 2 emails sent (applicant + HR)

### Manual Emails (Admin Action Required)
2. ✅ **Shortlist Button** → 1 email sent (congratulations)
3. ✅ **Reject Button** → 1 email sent (polite rejection)
4. ❌ **Ignore Button** → NO email sent (silent)

### Email Templates
- ✅ All emails use professional HTML templates
- ✅ All emails have SYNNECTIFY branding
- ✅ All emails include contact information
- ✅ All emails are mobile-responsive

### Email Safety
- ✅ Applications save even if email fails
- ✅ Backend logs all email attempts
- ✅ Errors don't block application process
- ✅ Retry mechanism for failed emails (handled by mailer)

---

**Status**: ✅ All Email Features Working  
**Last Updated**: 2025-10-18  
**Ignore Button**: ✅ Confirmed NO EMAIL SENT
