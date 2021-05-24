import 'react-native-gesture-handler'
import React,{useState} from 'react';
import { StyleSheet,StatusBar,View,Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Foundation } from '@expo/vector-icons'; 
import StepIndicator from 'react-native-step-indicator';
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#dd4e4e',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#dd4e4e',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#dd4e4e',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#dd4e4e',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#dd4e4e',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#dd4e4e'
  }
  const labels=["Guide","Budget","Marketing"];

export default function AboutUs (){ 
    const [currentPosition,setCurrentPosition]=useState(0);
    const nextstep =() =>{
        setCurrentPosition(currentPosition+1);
    }
    const backstep= ()=>{
        setCurrentPosition(currentPosition-1);
    }
    const Data = [
        {label:' To Guide', status:'guide pepole to how to successfully build their business and help them sell their products and reach their target customers.'},
        {label:'Budget',status:'helps people to easy basic sets of tasks as- budget handling, financial Analysis'},
        {label:'Marketing',status:'pepole can start posting to their profile to start selling'}
];
    return (
        <View style={{flex:1,padding:15}}>
           <StepIndicator
           customStyles={customStyles}
           currentPosition={currentPosition}
           labels={labels}
           direction='vertical'
           stepCount='3'
           renderLabel={({position,stepStatus,label,crntPosition})=>{
               return(
                   <View style={style.lblcont}>
                   <Text style={style.lbltxt}>{Data[position].label}</Text>
                  <Text style={[style.status,{marginTop:5}]}>{Data[position].status}</Text>
                  </View>
               )
           }}
           />
           <View style={{flexDirection:'row'}}>
           <TouchableOpacity style={{marginRight:30}} onPress={() =>backstep()}>
           <Foundation name="arrow-left" size={30} color="#dd4e4e"/>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() =>nextstep()}>
           <Foundation name="arrow-right" size={30} color="#dd4e4e"/>
           </TouchableOpacity>
           </View>
        </View>
      ); 
}
const style=StyleSheet.create({
   status:{
       fontSize:15,
   },
   lbltxt:{
       fontSize:17,
       color:'#000',
       fontWeight:'bold'
   },
   lblcont:{
       padding:10,
       paddingTop:40,
       paddingLeft:5,
   },
    });