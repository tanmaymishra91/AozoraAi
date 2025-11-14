
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types';
import * as authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  deductCredit: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getMe();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, pass: string) => {
    const loggedInUser = await authService.login(email, pass);
    setUser(loggedInUser);
  };

  const register = async (name: string, email: string, pass: string) => {
    const newUser = await authService.register(name, email, pass);
    setUser(newUser);
  };
  
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const deductCredit = useCallback(async (amount: number) => {
    if (!user) throw new Error("No user is logged in.");
    if (user.role === 'admin') return; // Admins are not charged

    const updatedUser = await authService.deductCredit(user.id, amount);
    setUser(updatedUser);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, deductCredit }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};