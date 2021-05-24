import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DemoPro from '../appScreens/demoprofile';
import ProductPostDemo from '../components/ProductPostDemo';

const Stack = createStackNavigator();

const demopronav = () => {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator    
    screenOptions={{
     swipeEnabled: false,
    }}>
        <Stack.Screen name="ProductPostDemo" component={ProductPostDemo}/>
        <Stack.Screen name="DemoPro" component={DemoPro}/>
   

      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default demopronav;