import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Login } from './src/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const stack = createNativeStackNavigator();
export default function App() {
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaView> 
  );
}

 
