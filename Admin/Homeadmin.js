import React,{useState,useEffect} from 'react';
import { ScrollView,View,Button,StyleSheet,Text,FlatList,ActivityIndicator,Image} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HomeComp from '../components/HomeComp';
import Loader from '../components/Loader';
import Addcat from './addCat';
import Addtips from './addtips';
import Catitem from './catitem';
import {Constants, Notifications,NOTIFICATIONS} from 'expo';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import style from '../style';
import LogInNav from './adminlognav';
import Reportitem from './reportitem';

export default function Homeadmin ({navigation}) {  

 const [Loading, setLoading] = useState(true);
 const [name,SetAdminName]=useState('');
 
 const read=async()=>{
  const name = await AsyncStorage.getItem('name')
  if (name !== null) {
    SetAdminName(eval(name))
  }}

  useEffect(() => {
    read(); 
  })

 setTimeout(() => {
  setLoading({
    Loading: false,
  });
}, 2500);
  
  return(
  
    
   <ScrollView  >
     <View style={style.nav}></View>
        <Loader loading={Loading} />
        
        <Text style={{fontSize:20,padding:16 }}>{name}</Text>

        < Button 
             onPress={()=>navigation.navigate('LogIn')}
             title=' logout'
             color='#dc143c'
             /> 

        <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,height:1}}/>
        <View style={{marginTop:10,marginBottom:10,alignItems:'center'}}>
           <Addcat/>
           <Addtips/>
             </View>

             <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Button 
            onPress={()=>navigation.navigate('reportitem')}
             title=' comments'
             color='#dc143c'
             /> 

            <Button 
            onPress={()=>navigation.navigate('catitem')}
             title=' categories'
             color='#dc143c'
/> 

             </View>

          


     <View  style={{width: 'auto', height: 'auto',alignItems:'center',marginTop:20,}}>


        
        

    { /*<HomeComp pic={require('../images/f2.png')} title={'Food'}       navigation={navigation}/>
     <HomeComp pic={require('../images/s1.jpg')} title={'Sweet'}      navigation={navigation}/>
     <HomeComp pic={require('../images/a4.jpg')} title={'Art'}        navigation={navigation}/>
     <HomeComp pic={require('../images/c1.jpg')} title={'Craft'}      navigation={navigation}/>
     <HomeComp pic={require('../images/ac1.jpg')} title={'Jewelry'}   navigation={navigation}/>
     <HomeComp pic={require('../images/p1.jpg')} title={'paintings'}  navigation={navigation}/>
     <HomeComp pic={require('../images/fu2.jpg')} title={'Furnature'} navigation={navigation}/>
     <HomeComp pic={require('../images/clo.jpg')} title={'clothes and netting'} navigation={navigation}/>
     <HomeComp pic={require('../images/others.png')} title={'other'}     navigation={navigation}/>
  */}
<KeyboardSpacer/>

   <KeyboardSpacer/>
   
   </View>

  </ScrollView>
    );

}const styles = StyleSheet.create({
  second:{
    flex:1,
    flexDirection:'row',
  },
  Title:{
    padding:5,
    fontWeight:'bold',
    height:35,
   
  },
  
    itemsno:{
      width:'auto',
      flexDirection:'row',
      marginTop:5,
      justifyContent:'center'
    },
  
    header:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
  
    Form:{
      margin:10,
      flexDirection:'row',
      borderRadius:15,
      padding:10,
      paddingTop:15,
      paddingBottom:20, 
      backgroundColor:'white',
      height:'auto',
      shadowColor: "#000",
      shadowOffset: {	width: 0,	height: 5},
      shadowOpacity: 0.28,
      shadowRadius: 5.00,
      elevation: 4,
      marginBottom:10
  }, 
  })