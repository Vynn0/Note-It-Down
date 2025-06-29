import React from 'react';
import { TextInput, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { AuthFormData } from '@/hooks/useForm';
import { styles } from './styles';

interface AuthFormProps {
  formData: AuthFormData;
  isRegisterMode: boolean;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onSubmit: () => void;
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  formData,
  isRegisterMode,
  loading,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onToggleMode,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textInputStyle = [
    styles.textInput,
    isDark ? styles.darkTextInput : styles.lightTextInput
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegisterMode ? 'Create Account' : 'Welcome Back'}</Text>
      <View 
        style={styles.separator} 
        lightColor="rgba(0,0,0,0.1)" 
        darkColor="rgba(255,255,255,0.2)" 
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={textInputStyle}
          value={formData.email}
          onChangeText={onEmailChange}
          placeholder="Enter your email"
          placeholderTextColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={textInputStyle}
          value={formData.password}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          placeholderTextColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
        />
      </View>

      {isRegisterMode && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={textInputStyle}
            value={formData.confirmPassword}
            onChangeText={onConfirmPasswordChange}
            placeholder="Confirm your password"
            placeholderTextColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
          />
        </View>
      )}

      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.disabledButton]} 
        onPress={onSubmit}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {isRegisterMode ? 'Create Account' : 'Sign In'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={onToggleMode}
        activeOpacity={0.7}
      >
        <Text style={styles.toggleButtonText}>
          {isRegisterMode 
            ? "Already have an account? Sign in" 
            : "Don't have an account? Create one"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        {isRegisterMode 
          ? "Create an account to sync your notes across devices" 
          : "Sign in to access your notes from anywhere"}
      </Text>
    </View>
  );
};