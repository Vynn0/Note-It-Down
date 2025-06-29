import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { AuthService, LoginCredentials, RegisterCredentials } from '@/services/authService';

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  authLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    try {
      await AuthService.login(credentials);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    setLoading(true);
    try {
      await AuthService.register(credentials);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    authLoading,
    login,
    register,
    logout,
  };
};