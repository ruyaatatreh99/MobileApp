import 'react-native-gesture-handler'
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { Divider } from 'react-native-elements';
import style from '../style';
import AsyncStorage from '@react-native-community/async-storage';

export default function TotalComponent(){
    const [total, setTotal] = useState(0);
    const readtotal=async()=>{ await AsyncStorage.getItem('cost').then((value) => {
      setTotal(eval(value)); });} 
      useEffect(() => {
        readtotal()
      
      }, [total])
    
    return(
        
        <View style={styles.foot}>

        <Divider style={{backgroundColor:'#dc143c',marginTop:10,marginBottom:10,}}/>

        <View style={styles.total}>

        <View style={{padding:5,justifyContent:'space-around',flexDirection:'row'}}>
        <Text style={style.Title} > sub Total :</Text>
        <Text style={style.Title} >{total}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
        <Text>Check Out</Text>
        </TouchableOpacity>

        </View>

        </View>

    );}

    const styles = StyleSheet.create({
        button: {
          alignItems: "center",
          backgroundColor: '#dc143c',
          padding: 10,
          margin:10,
          borderRadius:10,
          
        },

        total:{
           borderWidth:1,
           borderColor:'#dc143c',
           borderRadius:10,
           backgroundColor:'white',
           shadowColor: "#000",
           shadowOffset: {	width: 5,	height: 5,},
           shadowOpacity: 0.38,
           shadowRadius: 4.00,
           elevation: 54,
        },

        foot: {
            position: 'absolute',
            bottom:5,
            width: '96%',
          },
    })