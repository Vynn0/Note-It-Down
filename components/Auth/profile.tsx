import React from 'react';
import { TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { User } from 'firebase/auth';
import { styles } from './styles';

interface ProfileSectionProps {
  user: User;
  onLogout: () => Promise<void>;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ user, onLogout }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await onLogout();
              Alert.alert('Success', 'Logged out successfully!');
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View 
        style={styles.separator} 
        lightColor="rgba(0,0,0,0.1)" 
        darkColor="rgba(255,255,255,0.2)" 
      />
      
      <View style={[
        styles.profileContainer,
        isDark ? styles.darkProfileContainer : styles.lightProfileContainer
      ]}>
        <Text style={styles.profileLabel}>Logged in as:</Text>
        <Text style={[
          styles.profileEmail,
          isDark ? styles.darkProfileEmail : styles.lightProfileEmail
        ]}>
          {user.email}
        </Text>
        
        <View style={[
          styles.profileInfo,
          isDark ? styles.darkProfileInfoBorder : styles.lightProfileInfoBorder
        ]}>
          <Text style={styles.profileInfoLabel}>User ID:</Text>
          <Text style={styles.profileInfoValue} numberOfLines={1} ellipsizeMode="middle">
            {user.uid}
          </Text>
        </View>
        
        <View style={[
          styles.profileInfo,
          isDark ? styles.darkProfileInfoBorder : styles.lightProfileInfoBorder
        ]}>
          <Text style={styles.profileInfoLabel}>Email Verified:</Text>
          <Text style={[
            styles.profileInfoValue,
            { color: user.emailVerified ? '#34C759' : '#FF3B30' } // iOS green/red
          ]}>
            {user.emailVerified ? 'Yes' : 'No'}
          </Text>
        </View>
        
        <View style={[
          styles.profileInfo,
          isDark ? styles.darkProfileInfoBorder : styles.lightProfileInfoBorder
        ]}>
          <Text style={styles.profileInfoLabel}>Account Created:</Text>
          <Text style={styles.profileInfoValue}>
            {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
          </Text>
        </View>
        
        <View style={[
          styles.profileInfo,
          { borderBottomWidth: 0 } // Remove border from last item
        ]}>
          <Text style={styles.profileInfoLabel}>Last Sign In:</Text>
          <Text style={styles.profileInfoValue}>
            {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};