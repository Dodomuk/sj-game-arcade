import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import GuessCelebrityScreen from './screens/GuessCelebrityScreen';
import MemoryGameScreen from './screens/MemoryGameScreen';
import ReactionGameScreen from './screens/ReactionGameScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'GuessCelebrity') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'MemoryGame') {
              iconName = focused ? 'card' : 'card-outline';
            } else if (route.name === 'ReactionGame') {
              iconName = focused ? 'flash' : 'flash-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#667eea',
          tabBarInactiveTintColor: '#999',
          headerStyle: {
            backgroundColor: '#667eea',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '🎮 게임 아케이드',
            tabBarLabel: '홈',
          }}
        />
        <Tab.Screen
          name="GuessCelebrity"
          component={GuessCelebrityScreen}
          options={{
            title: '🌟 연예인 맞추기',
            tabBarLabel: '연예인',
          }}
        />
        <Tab.Screen
          name="MemoryGame"
          component={MemoryGameScreen}
          options={{
            title: '🎴 메모리 게임',
            tabBarLabel: '메모리',
          }}
        />
        <Tab.Screen
          name="ReactionGame"
          component={ReactionGameScreen}
          options={{
            title: '⚡ 반응속도',
            tabBarLabel: '반응',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
