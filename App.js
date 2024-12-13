import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import SongRecommendation from './SongRecommendation';
import { Platform } from 'react-native';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Recommend') {
              iconName = 'music';
            }
            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'yellowgreen',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            ...Platform.select({
              web: {
                backgroundImage: 'linear-gradient(to right,#a5a0fc,#7ae3f8,#00d4ff)',
                color: 'white',
                height: 60,
              },
              default: {
                backgroundColor: 'green',
                height: 60,
              },
            })
          },
          
          
          headerShown: false, // Hide the header
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Recommend" component={SongRecommendation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
