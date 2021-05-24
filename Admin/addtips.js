import React, {Component, useState,useEffect} from "react";
import 'react-native-gesture-handler'
import {View,Text,StyleSheet,TextInput,Button,Image,ScrollView,TouchableOpacity} from 'react-native';
import { BottomSheet,ListItem} from 'react-native-elements'; 
import styles from '../Global/addProductStyle';
import PhotoButton from "../components/PhotoButton";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

    export default function AddTips () {  

    const [tiptext,Settiptext]=useState(' ');

   const addtip= async()=>{
               
         fetch('http://192.168.1.115/project/Addtip.php',{
             method:'post',
             header:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({     
                text: tiptext,
              })
         }) 
         //responce
          .then((response)=> response.json())
      .then((responseJason)=>{
        if(responseJason === 'fill all information')alert(responseJason);
         if(responseJason === 'tip added Successfully')alert(responseJason);

        else{
          alert(responseJason);
        }
         //error
        }).catch((error)=>{
             console.error(error);
         })
     }
     useEffect(() => {
   
      });


    return(
<View style={{width:'96%',backgroundColor:'lightgray',borderRadius:15,marginTop:15,paddingLeft:30}}>

  <Text style={styles.Title}>Add Tip</Text>


      <Text style={styles.Title}>tip:</Text>
      <TextInput style={{width:'90%',borderRadius:10,borderWidth:1,height:40}}  placeholder='tip...' onChangeText={tiptext => Settiptext(tiptext)}  />


   
   <Button  title='ADD' color='#dc143c'  onPress={ addtip}/> 
   </View>
    );
    }