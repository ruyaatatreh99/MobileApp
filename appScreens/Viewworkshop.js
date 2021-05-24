import 'react-native-gesture-handler'
import React,{useState} from 'react';
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation ,Feather} from '@expo/vector-icons';
import Flag from '../Global/header';
import style from '../style.js';

export default function Viewworkshop({ProductName,Discribtion,Rating,onClick}){
    return(
        <View style={style.Form}>
            <Text style={style.Titles}>{ProductName}</Text>
            
            <View style={style.second}>

            <View  >
            <Text style={style.Title}>{Discribtion  }                 </Text> 
            </View>

            <View>{Rating}</View>

            <View >
              <Avatar 
                 title="PP"
                size="xlarge"
                rounded={false}
                overlayContainerStyle={{backgroundColor: 'gray'}}
                activeOpacity={0.1}>
              </Avatar> 
           </View>

           </View>
           

           <View style={styles.second}>
           <Feather name="calendar" size={40}/>
           <Feather name="clock" size={40}/>
           <Feather name="map-pin" size={40}/>
           </View>
            
        </View>
    );

}

const styles = StyleSheet.create({
    second:{
        flexDirection:'row',
        margin:10,
        justifyContent:'space-between',
        alignContent:'space-around',

    }
})