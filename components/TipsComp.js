import React,{useState} from 'react';
import { View,Button,StyleSheet,Text} from 'react-native';

export default function TipsComp ({tip}) {  



    return(
        <View style={styles.Form} >
      <Text style={{margin:10,padding:20}}>{tip}</Text>

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