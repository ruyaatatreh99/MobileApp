import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginNavigator from './loginNavigator';
import Swipnav from './swipnav';


const Stack = createStackNavigator();

const skip = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="LoginNavigator" component={LoginNavigator}/>
        <Stack.Screen name="Swipnav" component={Swipnav}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default skip;

