import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { auth } from './firebaseConfig';

const Drawer = createDrawerNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

type DrawerParamList = {
  index: undefined;
  two: undefined;
  modal: undefined;
  login: undefined;
  register: undefined;
};

// Custom drawer content
function CustomDrawerContent(props: any) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1 }} />
      <View style={styles.authRow}>
        {user ? (
          <>
            <Text style={styles.emailText}>{user.email}</Text>
            <Pressable
              style={({ pressed }) => [
                styles.authButton,
                pressed && { backgroundColor: '#e6e6e6' }
              ]}
              onPress={async () => {
                await signOut(auth);
                props.navigation.closeDrawer();
                router.replace('/login'); // redirect ke login setelah logout
              }}
            >
              <Text style={styles.authText}>Logout</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.authButton,
              pressed && { backgroundColor: '#e6e6e6' }
            ]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('login');
            }}
          >
            <Text style={styles.authText}>Login</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.registerRow}>
        <Text>Belum punya akun?</Text>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.registerText}> Register</Text>
        </Pressable>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Versi 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function TabLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (!firebaseUser) {
        router.replace('/login'); // redirect ke login jika belum login
      }
    });
    return unsubscribe;
  }, []);

  if (loading) {
    // Tampilkan loading sebentar
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    // Sudah diarahkan ke login, tidak perlu render drawer
    return null;
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()}>
            {({ pressed }) => (
              <FontAwesome
                name="bars"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        ),
      })}
    >
      <Drawer.Screen
        name="index"
        component={require('./index').default}
        options={{
          title: 'Tab One',
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Drawer.Screen
        name="two"
        component={require('./two').default}
        options={{
          title: 'Tab Two',
          drawerIcon: ({ color }) => <TabBarIcon name="microphone" color={color} />,
        }}
      />
      <Drawer.Screen
        name="modal"
        component={require('../modal').default}
        options={{
          title: 'Model Settings',
          drawerIcon: ({ color }) => <TabBarIcon name="sliders" color={color} />,
        }}
      />
      <Drawer.Screen
        name="register"
        component={require('./register').default}
        options={{
          title: 'Register',
          drawerItemStyle: { height: 0 }, // agar tidak muncul di daftar drawer
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  authRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  authButton: {
    padding: 10,
    borderRadius: 8,
  },
  authText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 8,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  registerText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  versionText: {
    color: '#888',
    fontSize: 14,
  },
});
