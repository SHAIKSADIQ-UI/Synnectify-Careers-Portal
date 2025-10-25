// src/pages/LoginPage.tsx
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const googleLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.send profile email",
    onSuccess: async (resp) => {
      try {
        // Fetch user info from Google
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${resp.access_token}` } }
        ).then((r) => r.json());

        // Authenticate with backend
        const backendResponse = await fetch(`${API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userInfo.name || `${userInfo.given_name || ''} ${userInfo.family_name || ''}`.trim(),
            email: userInfo.email,
            photo: userInfo.picture,
          }),
        });

        if (!backendResponse.ok) {
          throw new Error("Backend authentication failed");
        }

        const { user, token } = await backendResponse.json();

        // Save to localStorage for backward compatibility
        localStorage.setItem("gmail_at", resp.access_token);
        localStorage.setItem("gmail_email", user.email);
        localStorage.setItem("gmail_firstName", userInfo.given_name || "");
        localStorage.setItem("gmail_lastName", userInfo.family_name || "");

        // Login with complete profile
        login(token, user.email, user.name, user.photo, user.role);
        
        navigate(state?.from?.pathname || "/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      }
    },
    onError: () => alert("Google sign-in failed"),
  });

  useEffect(() => {
    googleLogin(); // auto-open popup
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p>Signing you in…</p>
    </div>
  );
};

export default LoginPage;