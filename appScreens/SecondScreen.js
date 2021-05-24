import React,{useState} from 'react';
import { Text,View,StyleSheet,ImageBackground,Button,TouchableOpacity,ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import Skipnav from '../navigators/skipnav';
import Swipnav from '../navigators/swipnav';
import Styles from '../Global/firstStyle'

export default function FirstPage ({navigation}){ 

    const SkipHandler=()=>{
        navigation.navigate('LoginNavigator');
        
      }

  return (
    
<View style={Styles.container}>
    <ImageBackground style={Styles.image} source={require('../images/2.jpg')} op >
    <Text style={Styles.Titl}>YB </Text>
    <Text style={Styles.Text}>Start your own Business </Text>

    <View style={Styles.button}>
        
    <TouchableOpacity style={{width:100,flexDirection:'row',marginTop:300,marginLeft:300}} onPress={SkipHandler}>
        <Text style={Styles.text1}>Skip</Text>
        <AntDesign name="arrowright" size={30} color="blue" style={{marginTop:5}} />
 
    </TouchableOpacity>
    </View>
    </ImageBackground> 
</View>
      
  );
}