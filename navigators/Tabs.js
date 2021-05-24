import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text,ScrollView,View,Button,Image} from 'react-native';
import style from '../style';
import Home from '../appScreens/HomeScreen';
import Search from '../appScreens/search';
import DemoPro from '../appScreens/demoprofile';
import Drawers from './drawers';
import Notification from '../appScreens/notifications'
import Searchnav from './searchnav';
import Homenav from './Homenav';
import msgnav from './msgnav';
import acceptorder from '../appScreens/acceptorder';
import { EvilIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
const Tab = createMaterialTopTabNavigator();

const MyTabs=()=>{
  const[userid,setuserid]=useState(0);
  const [text,settext]=useState('');
  const [number,setnumber]=useState(0);
  const [orderItem,setOrderItem]=useState([]);
  const readuserid=async()=>{
    await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });
   } 
   const readData =  () => {
    fetch('http://192.168.1.113/project/getorder.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
      userid:userid
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason === 'No Notification')settext(responseJason);
      else {setOrderItem(responseJason.results); 
      settext(' ');
    setnumber(orderItem.length)}
       }).catch((error)=>{
       console.error(error);
      })
    }
useEffect(() => {
  readuserid()
 readData()
})
  const j=2;
  const BadgedIcon = withBadge(number)(Icon);
  return(
    <Tab.Navigator independent={true}
    style={style.nav} initialRouteName="Drawer"
    
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showIcon: 'true',
        showLabel: false,

      }}>

      <Tab.Screen   name="Home" component={Homenav}
      options={{
        tabBarIcon:()=>(
            <AntDesign name="home" size={24} color="black" />
        ) }} />
      <Tab.Screen  name="Searchnav" component={Searchnav} 
        options={{
         tabBarIcon:() =>(
          <EvilIcons name="search" size={24} color="black" />
              )}}/>

<Tab.Screen   name=" Notification" component={msgnav} 
       options={{
        tabBarIcon:()=>(
          //<Ionicons name="ios-notifications-outline" size={24} color="black" />    
        
<BadgedIcon type="ionicon" name="ios-notifications-outline"/>
              )}}/>
          
          <Tab.Screen   name="acceptorder" component={acceptorder}
      options={{
        tabBarIcon:()=>(
          <Ionicons name="ios-done-all" size={24} color="black" />
        ) }} />
              
      <Tab.Screen   name=" more" component={Drawers} 
       options={{
        tabBarIcon:()=>(
         <Fontisto name="more-v-a" size={20} color="black" style={{}} />      
              )}}/>




  </Tab.Navigator>
  
    );
}
export default MyTabs;