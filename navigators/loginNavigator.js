import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import LogIn from '../appScreens/login';
import ForgetPass from '../appScreens/forgetPass';
import SignIn from '../appScreens/signin';
import Home from '../navigators/Tabs';
import Homeadmin from '../Admin/Homeadmin';

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator    
      screenOptions={{
       headerShown: false,
       swipeEnabled: false,
      }}>
        <Stack.Screen name="LogIn" component={LogIn}/>
        <Stack.Screen name="ForgetPass" component={ForgetPass}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Home"   component={Home}/>
       <Stack.Screen name="Homeadmin"   component={Homeadmin}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};
export default MyStack;