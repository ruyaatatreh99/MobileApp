import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import LogIn from './AdminLogin';
import Homeadmin from './Homeadmin';
import catitem from './catitem';
import reportitem from './reportitem';

const Stack = createStackNavigator();
const Adminnav= () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator    
      screenOptions={{
       headerShown: false,
       swipeEnabled: false,
      }}>
        <Stack.Screen name="LogIn" component={LogIn}/>
        <Stack.Screen name="Homeadmin"   component={Homeadmin}/>
        <Stack.Screen name="catitem" component={catitem}/>
        <Stack.Screen name="reportitem"   component={reportitem}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};
export default Adminnav;