import 'react-native-gesture-handler'
import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,ActivityIndicator} from 'react-native'; 
import styles from '../Global/addProductStyle';

export default function Addworkshop(){ 
    return(

<View style={styles.Form}>

  <Text style={styles.Titles}>Add a new workshop</Text>

  <View  style={styles.second} >
      <Text style={styles.Title}>workshop Name:</Text>
      <TextInput style={styles.input}  placeholder='product name' />
  </View>

  <View  style={styles.second} >
  <Text style={styles.Title}>Location</Text>
      <TextInput style={styles.input} placeholder='describe' />
   </View>

   <View style={styles.second} >
       <Text style={styles.Title}>Date</Text>
       <TextInput style={styles.input} placeholder='price'/>
   </View>
   <View style={styles.second} >
       <Text style={styles.Title}>Clock</Text>
       <TextInput style={styles.input} placeholder='price'/>
   </View>
   <View style={styles.second} >
       <Text style={styles.Title}>Describe:</Text>
       <TextInput style={styles.input} placeholder='price'/>
   </View>
   
   <Button 
     title='ADD' color='#dc143c' /> 
     
   </View>
    );
}