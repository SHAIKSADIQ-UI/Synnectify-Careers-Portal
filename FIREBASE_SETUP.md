# Firebase Authentication Setup Guide

## ✅ Implementation Complete!

Your application now uses **Firebase Authentication** instead of the previous Google OAuth setup. This provides better integration with your database and more robust authentication.

---

## 🔥 Firebase Configuration

### Firebase Project Details:
- **Project ID**: `itwebsite-fb2c4`
- **Auth Domain**: `itwebsite-fb2c4.firebaseapp.com`
- **App ID**: `1:342626968971:web:6371eb59c6ea5c98de7b8e`

### Services Enabled:
- ✅ **Firebase Authentication** (Google Sign-In)
- ✅ **Cloud Firestore** (Database ready)
- ✅ **Firebase Analytics**

---

## 📁 Files Modified

### 1. **New Files Created:**
- `src/firebase/config.ts` - Firebase initialization and configuration
- `FIREBASE_SETUP.md` - This documentation

### 2. **Updated Files:**
- `src/context/AuthContext.tsx` - Updated to use Firebase Auth
- `src/pages/CareersPage.tsx` - Removed @react-oauth/google, now uses Firebase
- `src/pages/JobApplicationForm.tsx` - Uses Firebase user data
- `src/App.tsx` - Removed GoogleOAuthProvider wrapper
- `.env` - Added Firebase configuration variables

---

## 🚀 How It Works

### Authentication Flow:

1. **User clicks "Apply Now"** on Careers page
2. **Firebase Google Sign-In popup** appears
3. **User authenticates** with Google account
4. **Firebase stores** user session
5. **User redirected to Dashboard** to view job openings
6. **User selects position** and fills application form
7. **After submission**, user sees their applications in dashboard

### User Data Stored:
```typescript
{
  uid: string;           // Firebase unique ID
  email: string;         // User's email
  name?: string;         // Display name from Google
  photo?: string;        // Profile picture URL
  role?: string;         // "user" or "admin"
}
```

---

## 🔐 Firebase Console Setup (Already Done)

Your Firebase project is configured with:

### Authentication Providers:
- ✅ Google Sign-In (Enabled)
- 🔒 Email/Password (Can be enabled later)

### Authorized Domains:
- ✅ `localhost` (for development)
- ✅ `itwebsite-fb2c4.firebaseapp.com`

---

## 🗄️ Database Integration

### Current Setup:
- **Backend**: MongoDB (localhost:27017)
- **Frontend Auth**: Firebase Authentication
- **Data Sync**: Applications stored in both MongoDB and localStorage

### Future Enhancements (Optional):
You can migrate from MongoDB to Cloud Firestore:
```typescript
// Example: Store applications in Firestore
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

await addDoc(collection(db, 'applications'), {
  userId: user.uid,
  position: 'React Developer',
  status: 'Pending',
  appliedAt: new Date()
});
```

---

## 🌐 Environment Variables

Your `.env` file now contains:

```env
# Backend API
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBSfGyRipHrf7zYPK9OftbadkK5-gu-DA0
VITE_FIREBASE_AUTH_DOMAIN=itwebsite-fb2c4.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=itwebsite-fb2c4
VITE_FIREBASE_STORAGE_BUCKET=itwebsite-fb2c4.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=342626968971
VITE_FIREBASE_APP_ID=1:342626968971:web:6371eb59c6ea5c98de7b8e
VITE_FIREBASE_MEASUREMENT_ID=G-KG3GPNFE8Z
```

---

## 🎯 Features Working

✅ **Google Sign-In** via Firebase
✅ **User Session Management** with Firebase Auth
✅ **Protected Routes** (Dashboard, Apply Form)
✅ **Auto-fill User Data** in application forms
✅ **Application Submission** to backend
✅ **Dashboard** shows user's applications
✅ **Email Notifications** via Nodemailer
✅ **Admin Panel** for managing applications

---

## 🐛 Troubleshooting

### Issue: "Firebase is not defined"
**Solution**: Restart the development server
```bash
npm run dev
```

### Issue: "Auth domain not authorized"
**Solution**: Add your domain in Firebase Console > Authentication > Settings > Authorized domains

### Issue: "User data not persisting"
**Solution**: Check browser localStorage - Firebase stores auth tokens automatically

---

## 📊 Current Server Status

- **Backend**: http://localhost:5000 ✅ Running
- **Frontend**: http://localhost:5174 ✅ Running
- **MongoDB**: localhost:27017 ✅ Connected
- **Firebase**: itwebsite-fb2c4 ✅ Active

---

## 🔄 Testing the Application

1. Open the preview browser (click the button in the tool panel)
2. Navigate to **Careers** page
3. Click **Apply Now** on any position
4. Sign in with your Google account
5. You'll be redirected to **Dashboard**
6. Select a position and click **Apply Now**
7. Fill the form (name/email pre-filled from Google)
8. Submit and see your application in the dashboard!

---

## 📝 Next Steps (Optional Enhancements)

1. **Enable Email/Password Auth** in Firebase Console
2. **Add Password Reset** functionality
3. **Implement Role-Based Access** (Admin vs User)
4. **Migrate to Cloud Firestore** for applications
5. **Add Real-time Updates** using Firestore listeners
6. **Implement File Storage** using Firebase Storage

---

## 🎉 Summary

You now have a **fully functional Firebase-authenticated career portal** with:
- Seamless Google Sign-In
- User session management
- Protected routes
- Application submission workflow
- Email notifications
- Admin dashboard

**No more OAuth 400 errors!** 🚀

---

**Documentation Created**: 2025-01-18
**Firebase Version**: 11.x
**React Version**: 18.3.1
**Vite Version**: 7.0.5
