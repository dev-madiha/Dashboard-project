import React, { createContext, useContext, useState } from "react";
export type UserRole = "admin" | "doctor" | "patient";

export interface User {
  id?: string;
  username?: string;
  email?: string;
  role: UserRole;
  access_token?: string;
  token_type?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize user synchronously from localStorage so auth state is
  // available on first render. This prevents Protected routes from
  // redirecting to sign-in before the stored user is restored.
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(
      "permissions",
      JSON.stringify(userData.permissions || [])
    );
    localStorage.setItem("user_roles", JSON.stringify([userData.role]));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
