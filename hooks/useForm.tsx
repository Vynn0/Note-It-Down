import { useState } from 'react';

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UseAuthFormReturn {
  formData: AuthFormData;
  isRegisterMode: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  toggleMode: () => void;
  resetForm: () => void;
  validateForm: (isRegister: boolean) => string | null;
}

export const useAuthForm = (): UseAuthFormReturn => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const setEmail = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
  };

  const setPassword = (password: string) => {
    setFormData(prev => ({ ...prev, password }));
  };

  const setConfirmPassword = (confirmPassword: string) => {
    setFormData(prev => ({ ...prev, confirmPassword }));
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const validateForm = (isRegister: boolean): string | null => {
    if (!formData.email.trim() || !formData.password.trim()) {
      return 'Please enter both email and password';
    }

    if (isRegister) {
      if (!formData.confirmPassword.trim()) {
        return 'Please fill in all fields';
      }
      if (formData.password !== formData.confirmPassword) {
        return 'Passwords do not match';
      }
      if (formData.password.length < 6) {
        return 'Password must be at least 6 characters long';
      }
    }

    return null;
  };

  return {
    formData,
    isRegisterMode,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleMode,
    resetForm,
    validateForm,
  };
};