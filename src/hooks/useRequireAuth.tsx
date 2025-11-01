// src/hooks/useRequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />;
};