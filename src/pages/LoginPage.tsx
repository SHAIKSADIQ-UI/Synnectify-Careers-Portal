// src/pages/LoginPage.tsx
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  // Handle navigation after authentication
  useEffect(() => {
    if (user) {
      navigate(state?.from?.pathname || "/dashboard");
    }
  }, [user, navigate, state]);

  // Trigger the login process
  useEffect(() => {
    const initiateLogin = async () => {
      try {
        await loginWithGoogle();
      } catch (error) {
        console.error("Login failed:", error);
        alert("Google sign-in failed");
      }
    };
    
    initiateLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p>Signing you in…</p>
    </div>
  );
};

export default LoginPage;