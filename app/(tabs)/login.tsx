import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, useColorScheme } from 'react-native';
import { registerUser, loginUser } from '@/firebase/firebaseConfig';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const result = isLogin 
      ? await loginUser(email, password)
      : await registerUser(email, password);

    if (result.success) {
      Alert.alert('Success', isLogin ? 'Logged in successfully!' : 'Account created successfully!');
      console.log('User:', result.user);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>{isLogin ? 'Login' : 'Register'}</Text>
      
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={handleAuth}>
        <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.switchButton} 
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text style={[styles.switchText, isDarkMode && styles.switchTextDark]}>
          {isLogin ? "Don't have an account? Register" : "Have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  titleDark: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  inputDark: {
    borderColor: '#444',
    backgroundColor: '#222',
    color: '#fff',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDark: {
    backgroundColor: '#1e88e5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '#fff',
  },
  switchButton: {
    alignItems: 'center',
  },
  switchText: {
    color: '#2196f3',
    fontSize: 14,
  },
  switchTextDark: {
    color: '#90caf9',
  },
});