import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../appScreens/notifications';
import Message from '../components/message';

const Stack = createStackNavigator();

const Msgnav = () => {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator    
    screenOptions={{
     swipeEnabled: false,
     headerShown: false,
    }}>
        <Stack.Screen name="Notifications" component={Notification}/>
        <Stack.Screen name="Messages" component={Message}/>
        

      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Msgnav;
