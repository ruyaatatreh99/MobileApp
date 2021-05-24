import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItems, DrawerNavigation } from 'react-navigation' 
import React, {Component, useState,useEffect} from "react";
import { View, Image, SafeAreaView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import style from '../style';
import Guide from '../appScreens/guide';
import Mypurchases from '../appScreens/Mypurchases';
import Profile from '../appScreens/profile';
import WishList from '../appScreens/WishList';
import Setting from '../appScreens/setting';
import AboutUs from '../appScreens/AboutUs';
import Delete from '../appScreens/Delete';
import ProfileComponent from '../components/profileComponent';
import Tabs from './Tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import GuidNav from '../navigators/GuideNav';
import { enableScreens } from 'react-native-screens'
import { Fontisto } from '@expo/vector-icons'; 
import Charts from '../appScreens/charts';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer'; 

 
const nav=(props)=>{
  AsyncStorage.clear();
  props.navigation.pop();
}

enableScreens()
const Draw = createDrawerNavigator();

function CustomDrawerContent(props,{ navigation }) {
  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out"
      onPress={() => nav({...props})}
       icon={({ focused, color, size }) => <Ionicons  size={26} color="black" name='ios-log-out' /> }
       />
    </DrawerContentScrollView>
  );
}

const Drawer=({navigation})=> {
  return (
      <Draw.Navigator initialRouteName="Profile " drawerPosition="right"  minSwipeDistance  independent={true}
      drawerContent={props => <CustomDrawerContent {...props} navigation={navigation}/>}> 
        <Draw.Screen name="Profile" component={Profile} options={{drawerIcon:({focused, size})=><MaterialIcons name="person-outline" size={24} color="black" />}} />
        <Draw.Screen name="Shopping Cart" component={Mypurchases} options={{drawerIcon:({focused, size})=><AntDesign name="shoppingcart" size={25} color="black" />}}/>
        <Draw.Screen name="Wish List" component={WishList} options={{drawerIcon:({focused, size})=><FontAwesome name="list-alt" size={24} color="black" />}}/>
        <Draw.Screen name="Business Guide" component={GuidNav}  options={{drawerIcon:({focused, size})=><MaterialCommunityIcons name="help-network-outline" size={24} color="black" />}}/>
        <Draw.Screen name="charts" component={Charts}  options={{drawerIcon:({focused, size})=><Fontisto name="line-chart" size={19} color="black" />}}/>
        <Draw.Screen name="About Us" component={AboutUs} options={{drawerIcon:({focused, size})=><MaterialCommunityIcons name="account-group-outline" size={24} color="black" />}}/>
        <Draw.Screen name="Settings" component={Setting} options={{drawerIcon:({focused, size})=><Feather name="settings" size={24} color="black" />}}/>
        <Draw.Screen name="Delete Account" component={Delete} options={{drawerIcon:({focused, size})=><FontAwesome name="remove" size={24} color="red" />}}/>
      </Draw.Navigator>

  );
}

export default Drawer;
