import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../appScreens/search';
import DemoPro from '../appScreens/demoprofile';

const Stack = createStackNavigator();

const Searchnav = () => {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator    
    screenOptions={{
     swipeEnabled: false,
     headerShown: false,
    }}>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="DemoPro" component={DemoPro}/>

      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Searchnav;
