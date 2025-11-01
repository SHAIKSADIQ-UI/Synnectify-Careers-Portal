// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  User as FirebaseUser 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

type Auth = {
  uid: string;
  email: string;
  name?: string;
  photo?: string;
  role?: string;
} | null;

const AuthContext = createContext<{
  user: Auth;
  firebaseUser: FirebaseUser | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}>({
  user: null,
  firebaseUser: null,
  loginWithGoogle: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Auth>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Extract user data from Firebase
        const userData: Auth = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || undefined,
          photo: firebaseUser.photoURL || undefined,
          role: "user", // Default role, can be fetched from Firestore
        };
        
        setUser(userData);
        
        // Save to localStorage for persistence
        localStorage.setItem("user_uid", firebaseUser.uid);
        localStorage.setItem("user_email", firebaseUser.email || "");
        if (firebaseUser.displayName) {
          localStorage.setItem("user_name", firebaseUser.displayName);
          // Split name for firstName/lastName
          const nameParts = firebaseUser.displayName.split(" ");
          localStorage.setItem("gmail_firstName", nameParts[0] || "");
          localStorage.setItem("gmail_lastName", nameParts.slice(1).join(" ") || "");
        }
        if (firebaseUser.photoURL) {
          localStorage.setItem("user_photo", firebaseUser.photoURL);
        }
      } else {
        setUser(null);
        // Clear localStorage
        localStorage.removeItem("user_uid");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_photo");
        localStorage.removeItem("user_role");
        localStorage.removeItem("gmail_firstName");
        localStorage.removeItem("gmail_lastName");
      }
      
      setLoading(false);
    });

    // Add event listener for beforeunload to handle auto-logout
    const handleBeforeUnload = () => {
      // Clear admin session if exists
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // User state will be updated automatically by onAuthStateChanged
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // User state will be updated automatically by onAuthStateChanged
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);