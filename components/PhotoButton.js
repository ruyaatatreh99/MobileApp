import React,{useState} from 'react';
import {  View ,TouchableOpacity} from 'react-native';

import { Entypo } from '@expo/vector-icons'; 

export default function PhotoButton({onpressb}){
    return(
        <View>
        <TouchableOpacity >
        <Entypo name="camera" size={24} color="gray"  onPress={()=> onpressb()} />
        </TouchableOpacity>
        </View>
    )  
}