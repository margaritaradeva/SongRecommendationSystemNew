import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import SongRecommendation from './SongRecommendation';
import { Platform } from 'react-native';


const Tab = createBottomTabNavigator();

/**
 * Main application component that sets up the navigation container and tab navigator. I used https://github.com/margaritaradeva/DissertationReactCLI - my dissertation implementation as a reference.
 * 
 * @returns {JSX.Element} The main application component.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 * 
 * @description
 * This component uses a Tab Navigator to switch between the "Home" and "Recommend" screens.
 * It also customizes the tab bar with icons and styles.
 * 
 * @property {Object} screenOptions - Options for configuring the tab navigator.
 * @property {Function} screenOptions.tabBarIcon - Function to render the icon for each tab.
 * @property {Object} screenOptions.tabBarStyle - Styles for the tab bar.
 * @property {boolean} screenOptions.headerShown - Whether to show the header.
 * 
 * @param {Object} route - The route object provided by React Navigation.
 * @param {boolean} focused - Whether the tab is focused.
 * @param {string} color - The color of the tab icon.
 * @param {number} size - The size of the tab icon.
 * 
 * @returns {JSX.Element} The tab icon component.
 * 
 * 
 * The easiest way to see changes on this bottom tabs menu is to change the name of the icon in the iconName variable or change the color of the icon in the tabBarActiveTintColor and tabBarInactiveTintColor properties.
 */
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
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'brown',
          tabBarStyle: {
            ...Platform.select({
              web: {
                backgroundImage: 'linear-gradient(to right, #a5a0fc, #c47ee2, #37aafc, #92d4ef, #00d4ff)',
                color: 'white',
                height: 60,
                borderTopWidth: 4,    // Set the border width
                borderTopColor: '#efbdff', // Set the border color
                borderStyle: 'solid'  // Set the border style
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
