import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../appScreens/HomeScreen';
import HomeData from '../appScreens/homedata';
import DemoPro from '../appScreens/demoprofile';
import ProductPostDemo from '../components/ProductPostDemo';

const Stack = createStackNavigator();

const Homenav = () => {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator    
    screenOptions={{
     headerShown: false,
     swipeEnabled: false,
    }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="HomeData" component={HomeData}/>
        <Stack.Screen name="ProductPostDemo" component={ProductPostDemo}/>
        <Stack.Screen name="DemoPro" component={DemoPro}/>

      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Homenav;
