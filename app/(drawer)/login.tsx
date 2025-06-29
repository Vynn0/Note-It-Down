import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/hooks/useAuth';
import { useAuthForm } from '@/hooks/useForm';
import { ProfileSection } from '@/components/Auth/profile';
import { AuthForm } from '@/components/Auth/auth';
import { styles } from '@/components/Auth/styles';

export default function LoginScreen() {
  const { user, loading, authLoading, login, register, logout } = useAuth();
  const {
    formData,
    isRegisterMode,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleMode,
    resetForm,
    validateForm,
  } = useAuthForm();

  const handleSubmit = async () => {
    const validationError = validateForm(isRegisterMode);
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    try {
      if (isRegisterMode) {
        await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        Alert.alert('Success', 'Account created successfully!');
        resetForm();
        toggleMode();
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        });
        Alert.alert('Success', 'Welcome back!');
        resetForm();
      }
    } catch (error: any) {
      Alert.alert(
        isRegisterMode ? 'Registration Failed' : 'Sign In Failed', 
        error.message
      );
    }
  };

  if (authLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  if (user) {
    return <ProfileSection user={user} onLogout={logout} />;
  }

  return (
    <AuthForm
      formData={formData}
      isRegisterMode={isRegisterMode}
      loading={loading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleSubmit}
      onToggleMode={toggleMode}
    />
  );
}