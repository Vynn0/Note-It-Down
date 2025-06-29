import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

function CustomDrawerContent(props: any) {
  const colorScheme = useColorScheme();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Note It Down
        </Text>
      </View>
      
      <DrawerItem
        label="Summaries"
        onPress={() => props.navigation.navigate('(tabs)', { screen: 'index' })}
        icon={({ color, size }) => (
          <FontAwesome name="list" size={size} color={color} />
        )}
      />
      
      <DrawerItem
        label="Record"
        onPress={() => props.navigation.navigate('(tabs)', { screen: 'two' })}
        icon={({ color, size }) => (
          <FontAwesome name="microphone" size={size} color={color} />
        )}
      />
      
      <DrawerItem
        label="Login"
        onPress={() => props.navigation.navigate('login')}
        icon={({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        )}
      />
      
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('modal')}
        icon={({ color, size }) => (
          <FontAwesome name="cog" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function HeaderLeft() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={({ pressed }) => ({
        marginLeft: 15,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name="bars"
        size={24}
        color={Colors[colorScheme ?? 'light'].text}
      />
    </Pressable>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text,
          drawerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          drawerInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          headerLeft: () => <HeaderLeft />,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: "Note It Down",
            drawerLabel: "Home",
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            headerTitle: "Authentication",
            drawerLabel: "Login",
          }}
        />
        <Drawer.Screen
          name="modal"
          options={{
            headerTitle: "Settings",
            drawerLabel: "Settings",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
