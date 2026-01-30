import { createContext, useState } from "react";
import { AuthService } from "@services";
import type { User } from "@/types";

export interface AuthContextType {
  user: Omit<User, "password"> | null;
  loading: boolean;
  loginOrRegister: (
    email: string,
    password: string,
  ) => {
    success: boolean;
    isNewUser?: boolean;
    error?: string;
  };
  logout: () => void;
  isAuthenticated: () => boolean;
  loginWithGoogle: (googleUser: {
    email: string;
    name: string;
    picture: string;
  }) => {
    success: boolean;
    isNewUser?: boolean;
  };
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => AuthService.getCurrentUser() || null);
  const [loading] = useState(false);

  const loginOrRegister = (email: string, password: string) => {
    const result = AuthService.loginOrRegister(email, password);
    if (result.success) {
      setUser(result.user || null);
      return { success: true, isNewUser: result.isNewUser };
    }
    return { success: false, error: result.error };
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return AuthService.isAuthenticated();
  };

  const loginWithGoogle = (googleUser: {
    email: string;
    name: string;
    picture: string;
  }) => {
    const result = AuthService.loginWithGoogle(googleUser);
    if (result.success) {
      setUser(result.user);
      return { success: true, isNewUser: result.isNewUser };
    }
    return { success: false };
  };

  const value = {
    user,
    loading,
    loginOrRegister,
    logout,
    isAuthenticated,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
