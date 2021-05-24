import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text,ScrollView,View,Button,Image} from 'react-native';
import style from '../style';
import First from '../appScreens/FirstPage';
import Second from '../appScreens/SecondScreen';
import Third from '../appScreens/thirdpage';
import LoginNavigator from './loginNavigator';

const Tab = createMaterialTopTabNavigator();

const MyTabs=()=>{
  return(
    <Tab.Navigator independent={true}
    style={style.nav} initialRouteName="Drawer"
    
      tabBarOptions={{
        initialRouteName: "screen2",
        animationEnabled: true,
        showLabel: false,
        showIcon: false,
        style: { height: 0 }
      }}>

      <Tab.Screen   name="first " component={First} />
      <Tab.Screen   name="Second " component={Second} />
      <Tab.Screen   name="Third" component={Third} />
      <Tab.Screen   name="LoginNavigator" component={LoginNavigator} />


  </Tab.Navigator>
  
    );
}
export default MyTabs;