import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export interface AuthError {
  code: string;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}

export class AuthService {
  static async login({ email, password }: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      return userCredential.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static async register({ email, password, confirmPassword }: RegisterCredentials): Promise<User> {
    // Validation
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      return userCredential.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Failed to logout: ' + error.message);
    }
  }

  private static handleAuthError(error: AuthError): Error {
    let errorMessage = 'Authentication failed';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'An account with this email already exists';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak';
        break;
      default:
        errorMessage = error.message || 'Authentication failed';
    }
    
    return new Error(errorMessage);
  }
}