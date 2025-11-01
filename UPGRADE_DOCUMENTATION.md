# SYNNECTIFY Career Portal - Upgrade Documentation

## 🚀 New Features & Enhancements

### ✅ Completed Upgrades

1. **User Profile Display (Top Right Corner)**
   - Gmail profile picture displayed after login
   - Fallback to circle avatar with initials if no photo
   - Dropdown menu with Dashboard, Admin Panel (for admins), and Logout options

2. **Job Openings Visibility Post-Login**
   - Dashboard now shows all available job openings
   - Users can apply directly from the dashboard
   - Job listings fetched from backend API

3. **Admin Access Control**
   - Admin dashboard accessible only via `/admin` route
   - Role-based authentication (Admin vs Regular User)
   - Admin can view all applications and manage job postings
   - Regular users redirected to user dashboard

4. **Email Notification System**
   - No-reply email configuration (`noreply@synnectify.com`)
   - Professional HTML email templates
   - Automated emails on:
     - Application submission (confirmation)
     - Application status updates (Shortlisted/Rejected)
   - Reply-to configured to `hr@synnectify.com`

5. **Pre-Login Home Page Redesign**
   - Beautiful background image with overlay
   - Centered Gmail login button with Google branding
   - Stats and features showcase
   - Auto-redirect to dashboard if already logged in

6. **UI/UX Improvements**
   - Modern gradient designs
   - Responsive layout for all devices
   - Smooth transitions and hover effects
   - Professional color scheme (Orange/Blue)

---

## 📁 Project Structure

```
IT_Website/
├── src/                          # Frontend (React + TypeScript + Vite)
│   ├── components/
│   │   ├── UserProfile.tsx       # 🆕 User profile dropdown
│   │   ├── Header.tsx            # ✨ Updated with user profile
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── PreLoginHome.tsx      # 🆕 New pre-login landing page
│   │   ├── DashboardPage.tsx     # ✨ Updated with job listings
│   │   ├── AdminDashboard.tsx    # 🆕 Admin-only dashboard
│   │   ├── LoginPage.tsx         # ✨ Updated auth flow
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.tsx       # ✨ Enhanced with user profile data
│   └── App.tsx                   # ✨ Updated routing
│
└── server/                       # Backend (Node.js + Express + MongoDB)
    ├── routes/
    │   ├── auth.js               # Google OAuth authentication
    │   ├── jobs.js               # Job CRUD operations
    │   └── applications.js       # ✨ Enhanced with email notifications
    ├── models/
    │   ├── User.js               # User schema with role field
    │   ├── Job.js
    │   └── Application.js
    ├── utils/
    │   └── mailer.js             # ✨ No-reply email configuration
    └── server.js
```

---

## 🔑 Key Components

### **1. UserProfile Component** (`src/components/UserProfile.tsx`)
- Displays user photo or initials
- Role-based navigation (Admin panel for admins)
- Logout functionality

### **2. PreLoginHome** (`src/pages/PreLoginHome.tsx`)
- Beautiful landing page with background image
- Centered Google login button
- Company stats showcase

### **3. DashboardPage** (`src/pages/DashboardPage.tsx`)
- User's applications list
- Available job openings
- Apply to jobs directly

### **4. AdminDashboard** (`src/pages/AdminDashboard.tsx`)
- View all applications
- Update application status (Shortlist/Reject)
- Manage job postings
- Delete jobs

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running on `localhost:27017`)
- Google OAuth Client ID

### 1. Frontend Setup

```bash
cd IT_Website
npm install
```

**Configure Environment Variables:**
Create/update `src/.env`:
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=http://localhost:5000/api
```

**Run Development Server:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 2. Backend Setup

```bash
cd server
npm install
```

**Configure Environment Variables:**
Update `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017/itwebsite
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=noreply@synnectify.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=SYNNECTIFY Careers <noreply@synnectify.com>
EMAIL_REPLY_TO=hr@synnectify.com
CLIENT_URL=http://localhost:5173
PORT=5000
```

**Run Server:**
```bash
npm run dev
```
Backend runs on: `http://localhost:5000`

### 3. Email Configuration (Gmail)

To enable email notifications:

1. Go to [Google Account Settings](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate an **App Password** for "Mail"
4. Use this app password in `EMAIL_PASS` in `server/.env`

---

## 👤 Creating Admin Users

### Method 1: Direct Database Update (MongoDB)

```bash
mongosh
use itwebsite
db.users.updateOne(
  { email: "admin@synnectify.com" },
  { $set: { role: "admin" } }
)
```

### Method 2: After First Login

1. User logs in via Google
2. Connect to MongoDB:
```bash
mongosh
use itwebsite
db.users.updateOne(
  { email: "your-email@gmail.com" },
  { $set: { role: "admin" } }
)
```
3. User logs out and logs back in
4. Admin panel will now be accessible

---

## 🗺️ Routing Structure

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Pre-login home page with Gmail login |
| `/login` | Public | Google OAuth login handler |
| `/home` | Public | Original company homepage |
| `/about` | Public | About page |
| `/services` | Public | Services page |
| `/portfolio` | Public | Portfolio page |
| `/contact` | Public | Contact page |
| `/careers` | Public | Job listings (public view) |
| `/apply` | Public | Job application form |
| `/dashboard` | Protected | User dashboard with applications & job listings |
| `/admin` | Admin Only | Admin dashboard (applications & job management) |

---

## 📧 Email Templates

### Application Received
- Sent when user submits application
- Includes job details and status
- Professional HTML design with gradients

### Application Status Update
- **Shortlisted**: Congratulatory email with next steps
- **Rejected**: Polite rejection with encouragement
- All emails are no-reply with HR contact info

---

## 🔐 Security Features

1. **JWT Authentication**: Secure token-based auth
2. **Role-Based Access Control**: Admin routes protected
3. **Protected Routes**: RequireAuth wrapper for sensitive pages
4. **Token Expiry**: 7-day token validity
5. **Secure Email**: No-reply configuration prevents spam

---

## 🎨 UI/UX Highlights

- **Color Scheme**: Orange (#f97316) + Blue (#3b82f6)
- **Typography**: Clean, readable fonts
- **Responsive**: Works on mobile, tablet, desktop
- **Animations**: Smooth transitions, hover effects
- **Accessibility**: Proper contrast, semantic HTML

---

## 🧪 Testing the Application

### Test Flow 1: Regular User
1. Visit `http://localhost:5173` → See pre-login home
2. Click "Sign in with Google" → Login page
3. Authenticate with Google → Redirected to `/dashboard`
4. View "My Applications" and "Job Openings"
5. Click "Apply Now" → Application form
6. Submit application → Email confirmation received
7. Click profile picture → See Dashboard, Logout options

### Test Flow 2: Admin User
1. Login as admin user (role='admin' in database)
2. Click profile picture → See "Admin Panel" option
3. Navigate to `/admin` → Admin dashboard
4. View all applications
5. Update application status → Email sent to applicant
6. Delete job postings

---

## 🐛 Troubleshooting

### Issue: "No job openings showing"
**Solution**: Ensure MongoDB is running and jobs collection has data.

### Issue: "Email not sending"
**Solution**: 
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Verify Gmail App Password is correct
- Check server console for email errors

### Issue: "Admin panel not showing"
**Solution**: 
- Check user role in MongoDB: `db.users.find({ email: "your@email.com" })`
- Should show `role: "admin"`

### Issue: "Login redirects to wrong page"
**Solution**: Clear localStorage and try again:
```javascript
localStorage.clear()
```

---

## 📝 Future Enhancements

- [ ] Add job posting form for admins
- [ ] Bulk application actions
- [ ] Advanced filtering and search
- [ ] Interview scheduling
- [ ] Applicant resume preview
- [ ] Export applications to CSV
- [ ] Real-time notifications with WebSockets

---

## 🤝 Contributing

All previous functionality, animations, and working code have been preserved. New features are additive and non-breaking.

---

## 📄 License

© 2025 SYNNECTIFY. All rights reserved.

---

## 📞 Support

For issues or questions:
- Email: hr@synnectify.com
- GitHub Issues: [Create an issue](#)

---

**Built with ❤️ by SYNNECTIFY Development Team**
