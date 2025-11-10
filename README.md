# Automated Job Application Portal with AI Calling Agent

An advanced job application platform featuring Firebase authentication, admin dashboard, job management system, and AI-powered calling agent integration.

## 🌟 Key Features

### For Job Seekers
- **Secure Authentication**: Firebase-based Google Sign-In for seamless access
- **Job Browsing**: View available positions with detailed descriptions
- **Easy Application**: One-click apply with pre-filled information from Google account
- **Application Tracking**: Dashboard to monitor submitted applications
- **Responsive Design**: Mobile-friendly interface for on-the-go access

### For Administrators
- **Admin Dashboard**: Comprehensive management interface
- **Job Management**: Create, edit, and remove job postings
- **Application Review**: View and manage all job applications
- **Enhanced Security**: OTP-based authentication for admin access
- **Email Notifications**: Automated email system for application updates

### Technical Features
- **Modern Tech Stack**: React, TypeScript, Vite, Tailwind CSS
- **Backend Services**: Node.js with Express and MongoDB
- **Real-time Updates**: Firebase integration for live data
- **Email System**: Nodemailer for professional communication
- **AI Integration**: Ready for AI calling agent implementation

## 🛠️ Technology Stack

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for responsive styling
- **Firebase** for authentication
- **React Router** for navigation

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **Nodemailer** for email notifications
- **RESTful APIs** for data communication

### DevOps
- **Git** for version control
- **GitHub** for repository hosting
- **ESLint** for code quality

## 📁 Project Structure

```
IT_Website/
├── src/                 # Frontend source code
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   └── App.tsx          # Main application component
├── server/              # Backend server code
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── public/              # Static assets
└── documentation/       # Project documentation files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance
- Firebase project
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Automated-Job-Application-Portal.git
   cd Automated-Job-Application-Portal
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create `.env` files in both root and server directories with your configuration:
   
   **Root .env:**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

   **Server .env:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_app_password
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd server
   npm start
   
   # In a new terminal, start frontend
   cd ..
   npm run dev
   ```

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm start` (in server directory) - Start backend server

## 🔐 Admin Access

To access the admin dashboard:
1. Navigate to `/admin-login`
2. Use the designated admin email: `careers.synnectify@gmail.com`
3. Enter the admin password
4. Complete OTP verification for enhanced security

Note: Only the specified email address can access the admin panel.

## 📧 Email Configuration

The system uses Nodemailer for email notifications:
- **Gmail Setup**: Requires App Password with 2FA enabled
- **Alternative Providers**: SendGrid, Mailgun, or AWS SES
- **Email Templates**: Professional HTML email designs

## 🤖 AI Calling Agent Integration

The platform is designed to integrate with AI calling agents:
- RESTful API endpoints ready for integration
- Webhook support for real-time notifications
- Extensible architecture for custom AI services

## 📄 Documentation

Comprehensive documentation is available in the repository:
- Setup guides
- Admin manuals
- Technical specifications
- Deployment instructions
- Troubleshooting guides

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact

For support or inquiries, please contact the development team.

---

*Built with ❤️ using modern web technologies*