import { createContext, useState, useEffect } from "react";
import { AuthService } from "@services";
import type { User } from "@/types";

export interface AuthContextType {
  user: Omit<User, "password"> | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loginOrRegister: (
    email: string,
    password: string,
  ) => {
    success: boolean;
    isNewUser?: boolean;
    error?: string;
  };
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  loginWithGoogle: () => Promise<{
    success: boolean;
    error?: string;
  }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(
    () => AuthService.getCurrentUser() || null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync session saat app load
    const initAuth = async () => {
      const result = await AuthService.syncSupabaseSession();

      if (result.success && result.user) {
        setUser(result.user);
      } else {
        console.log("No active session");
      }

      setLoading(false);
    };

    initAuth();

    // Setup auth state listener
    const {
      data: { subscription },
    } = AuthService.setupAuthListener((user) => {
      setUser(user);
    });

    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loginOrRegister = (email: string, password: string) => {
    const result = AuthService.loginOrRegister(email, password);
    if (result.success) {
      setUser(result.user || null);
      return { success: true, isNewUser: result.isNewUser };
    }
    return { success: false, error: result.error };
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return AuthService.isAuthenticated();
  };

  const loginWithGoogle = async () => {
    const result = await AuthService.loginWithGoogle();
    return result;
  };

  const value = {
    user,
    loading,
    setLoading,
    loginOrRegister,
    logout,
    isAuthenticated,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
