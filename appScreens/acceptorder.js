import 'react-native-gesture-handler'
import React,{useState,useEffect} from 'react';
import {View,ScrollView,Text,FlatList,Image,SafeAreaView,StyleSheet} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style';
//import { PushNotificationDeliveredObject } from 'react-native-push-notification';

export default function AcceptOrder () {  
  const [text,settext]=useState(' ');
  const [order,setorder]=useState([]);
  const [userid,setuserid]=useState(0);
  const readuserid=async()=>{
    await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });

   } 
  const readData =()=>{
    fetch('http://192.168.1.113/project/getacceptorder.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        userid:userid,
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason === 'No order yet')settext(responseJason);
      else {setorder(responseJason.results);settext(''); }
       }).catch((error)=>{
       console.error(error);
      })}
      const dilverd =(price,name,bid)=>{
        fetch('http://192.168.1.113/project/updateprice.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({     
            userid:userid,
            price:price,
            name:name,
            bid:bid
          })
        }) 
        .then((response)=> response.json())
        .then((responseJason)=>{
alert(responseJason);
           }).catch((error)=>{
           console.error(error);
          })}
    

     
      useEffect(() => {
       readData();
       readuserid(); 
      })
  
  
  return (  
      <ScrollView>  
            <View style={s.container}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
               <Text style={Styles.Titles} >Order</Text>
            </View>
            
            <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,marginTop:10}}/>
            <Text style={{fontSize:16,color:'#dc143c',marginLeft:20}}>{text}</Text>
   <FlatList
          data={order}  
          renderItem={({item})=>(
            <View >
                <View style={s.Form}>
                <View style={s.second}>
                <Ionicons name="ios-done-all" size={26} color='gray' onPress={()=>dilverd(item.itemprice,item.name,item.bid)} />
           </View>
                <Text style={Styles.Title} >{item.name}  </Text>
                <View style={{flexDirection:'row',marginLeft:10}}>

                    <View>
                    <Text>Item Number: {item.itemno}</Text>
                    <Text>Name :{item.username}</Text>
                    <Text>Address :{item.address}</Text>
                    <Text>Phone: {item.phone}</Text>
                    </View>

                    <View style={{paddingLeft:100,paddingBottom:10}}>
                        <Image style={{width:100,height:100}} source={{uri:item.image}}></Image></View>
                    </View>

                </View>
            </View>
          
          )}  />
</View>
      </ScrollView>
    );   
          }
 const s = StyleSheet.create({
        button: {
          alignItems: "center",
          backgroundColor: "#dc143c",
          padding: 10,
          borderRadius:10
        },
        button2: {
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
            borderRadius:10
          },
          Form:{
            borderRadius:15,
            padding:10,
            paddingTop:30,
            paddingBottom:30, 
            backgroundColor:'white',
            height:'auto',
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 5.00,
            elevation: 4,
            marginBottom:10
        }, 
        sth:{
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 5.00,
            elevation: 4,
        },
        container:{
            justifyContent:'center',
               marginTop:25,
               padding:10
               
             },
           purchases:{
             marginTop:5,
             marginBottom:150,
     
           },
           round:{
               height:26,
               width:26,
               borderRadius:13,
               backgroundColor:'red',
               margin:9
   
           },
           second:{
            flexDirection:'row',
            margin:5,
            justifyContent:'space-between',
            alignContent:'space-around',
    
        }
      });