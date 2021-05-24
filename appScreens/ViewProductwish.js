import 'react-native-gesture-handler'
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Image,ActivityIndicator} from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import style from '../style.js';


export default function ViewProductwish({ ProductName, Discribtion, Priceproduct,image,pid}){
    const[bid,setbid]=useState(0);
    const readuserid=async()=>{  await AsyncStorage.getItem('userid').then((value) => {
        setbid(eval(value));
      
    });}

      
    
    let k=0;
    

    useEffect(() => {

        readuserid()
      
    })
 
    
    const addshoppingcart=(pid)=>{
        fetch('http://192.168.1.113/project/addshoppingcart.php',{
            method:'post',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({   
               pid:pid,
               bid:bid,
             })
        }) 
         .then((response)=> response.json())
     .then((responseJason)=>{
        if(responseJason === 'product added to shopping cart'){alert(responseJason);}
        if(responseJason === 'Try Again')alert(responseJason);
        if(responseJason === 'Product Already Exist')alert(responseJason);
       }).catch((error)=>{
            console.error(error);
        })
   }   
    return(
        <View style={styles.Form}>
            <Text style={style.Titles}>{ProductName}</Text>
            <View style={styles.d}>
            <View >
            <Image style={{width:100,height:100}} source={{uri:image}}></Image>
           </View>

            <View  >
            <Text style={style.Title}>{Discribtion  }   </Text> 
            <Text style={style.Title}> Price :{Priceproduct} $   </Text> 
            </View>

           </View>
           

           <View style={styles.second}>
           <AntDesign name="shoppingcart" size={40} color='#dc143c' onPress={()=>addshoppingcart(pid)}/>
           </View>
            
        </View>
    );

}

const styles = StyleSheet.create({
    Form:{
        borderRadius:15,
        padding:10,
        paddingTop:40,
        paddingBottom:30, 
        backgroundColor:'white',
        borderColor:'#dc143c',
        borderWidth:2,
        height:350,
        shadowColor: "#000",
        shadowOffset: {	width: 0,	height: 12,},
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    d:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
      },
    second:{
        flexDirection:'row',
        margin:10,
        justifyContent:'space-between',
        alignContent:'space-around',

    }
})