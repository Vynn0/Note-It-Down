import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const Drawer = createDrawerNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Custom drawer content
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Versi 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  versionContainer: {
    marginTop: 'auto',
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    color: '#888',
    fontSize: 14,
  },
});
