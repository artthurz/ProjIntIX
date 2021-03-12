import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
// import Login from '../screens/SignIn';
import CreateProject from '../screens/CreateProject';
import CreateRequirement from '../screens/CreateRequirement'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen 
        name="Login" 
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={Login} /> */}
      <Tab.Screen name="Project"
        options={{
            tabBarLabel: 'Projeto',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            ),
          }}
        component={CreateProject} />
        <Tab.Screen name="Requirement"
        options={{
            tabBarLabel: 'Requisitos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            ),
          }}
        component={CreateRequirement} />
    </Tab.Navigator>
  );
}

