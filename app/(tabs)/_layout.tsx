import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

// Redirect component to drawer-based navigation
export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to drawer navigation
    router.replace('/');
  }, []);

  return null; // This will be replaced by the redirect
}