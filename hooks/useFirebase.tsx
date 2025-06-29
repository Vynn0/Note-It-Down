import { useState, useEffect } from 'react';
import { testConnection } from '@/firebase/firebaseConfig';

export const useFirebase = () => {
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Checking...');

  useEffect(() => {
    checkFirebase();
  }, []);

  const checkFirebase = () => {
    const status = testConnection();
    setFirebaseStatus(status);
  };

  return {
    firebaseStatus,
    checkFirebase,
  };
};