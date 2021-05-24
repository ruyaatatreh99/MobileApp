import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Guide from '../appScreens/guide'
import Notes from '../appScreens/Notes';
import Tips from '../appScreens/Tips';
import comment from '../appScreens/comments';
import Calculate from '../appScreens/Calculate';

const Stacks = createStackNavigator();

const Stacke = () => {
  return (
    <NavigationContainer independent={true}>
      <Stacks.Navigator>
        <Stacks.Screen name="Guide" component={Guide}/>
        <Stacks.Screen name="Notes" component={Notes}/>
        <Stacks.Screen name="Calculate" component={Calculate}/>
        <Stacks.Screen name="Tips" component={Tips}/>
        <Stacks.Screen name="comment" component={comment}/>
      </Stacks.Navigator>
      </NavigationContainer>
  );
};

export default Stacke;

