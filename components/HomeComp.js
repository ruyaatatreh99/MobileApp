import React,{useState} from 'react';
import { View,Button,StyleSheet,Text,Image} from 'react-native';
import {Overlay} from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import ViewProduct from '../appScreens/ViewProduct';
import Homenav from '../navigators/Homenav';


export default function HomeComp ({title,pic,navigation}) {  

    const goto =( )=>{
        navigation.navigate('HomeData',{type:title});
    }


    return(
        <View style={styles.Form} >
      
        <View style={{alignItems:'center',margin:10}}><Text style={{fontSize:17,}} >{title} </Text></View>
    
        <View style={{alignItems:'center'}}>
             <Image style={{height:140,width:'95%'}}source={pic}></Image>
        </View>
      
        <Button color='#dc143c' title='View' style={{fontSize:17,}} onPress={goto}/>
         
        </View>
    );}

    const styles = StyleSheet.create({
        Form:{
          borderRadius:10,
          backgroundColor:'white',
          borderColor:'#dc143c',
          borderWidth:1,
          shadowColor: "#000",
          shadowOffset: {	width: 0,	height: 5,},
          shadowOpacity: 0.48,
          shadowRadius: 10.00,
          marginTop:10,
          marginBottom:5,
          elevation: 24,
          width: '94%',
           height: 'auto',
           paddingTop:10,
           //marginLeft:5,
          // marginRight:5
        },
        })