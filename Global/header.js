import 'react-native-gesture-handler'
import React,{useState} from 'react';
import {View,ScrollView,Text,StyleSheet,TextInput,Button} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Feather } from '@expo/vector-icons'; 
import style from '../style';

export default function Header({navigation}){
    const openMenue=()=>{
        navigation.openDrawer();
    }
    return(
        <View style={styles.header}> 
        <Feather name="settings" size={24} color="black" onPress={openMenue} />
        <View><Text >your business</Text></View>

        </View>
    );
}

const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    }
})