import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,Keyboard,TouchableWithoutFeedback} from 'react-native';
import Navigator from './navigators/loginNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {AppLoading} from 'expo';
import style from './style.js';
import MyTabs from './navigators/Tabs';
import Drawer from './navigators/drawers';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Swipnav from './navigators/swipnav';
import AdminLogin from './Admin/AdminLogin';
import Adminnav from './Admin/adminlognav';


export default function App() {
  console.disableYellowBox=true;

    return (
      <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss();
       }}>


{/* <NavigationContainer style={style.tabscreen}  >   
             { < Swipnav/>}
    </NavigationContainer>*/}

   <NavigationContainer style={style.tabscreen}  >  
     <Adminnav/>
    </NavigationContainer>
      

      </TouchableWithoutFeedback>
      
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
});

