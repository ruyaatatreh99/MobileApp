import * as React from 'react';
import {ScrollView,View,StyleSheet,Button} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GuideComp from '../components/GuideComp';
import style from '../style.js';


export default function Guide ({navigation}) { 

  const CalcHandler=()=>{
    navigation.navigate('Calculate');
  }
  const NoteHandler=()=>{
    navigation.navigate('Notes');
  }   
  const MeetingHandler = () =>{
    navigation.navigate('Tips');
  }
  const commenthandler = () =>{
    navigation.navigate('comment');
  }
  
  return (  
    <ScrollView >

      <View style={styles.container}>
    
      <View style={style.card}>
        <GuideComp title={'MY Todo list'} sth={'Write your goals and checklists here to track your progress'} pic={require('../images/d.jpg')} onclick={NoteHandler}/>
        <GuideComp title={'Calculate'} sth={'To help you track your finanses and your profit'} pic={require('../images/calc.jpg')} onclick={CalcHandler} />
      </View>

      <View style={styles.card}>
     <GuideComp title={'Tips'}  sth={'To help you daily for progress'} pic={require('../images/tips.png')} onclick={MeetingHandler} />
     <GuideComp title={'Success stories'} sth={'see people experiences and advice '} pic={require('../images/co.jpg')} onclick={commenthandler} />

      </View>
    
    <KeyboardSpacer/>

    </View>
</ScrollView>
      );
}  

const styles = StyleSheet.create({
  container:{
    margin:5,
    marginTop:25,
    justifyContent:'center',
  },
  card:{
    margin:5,
    flex:1,
    alignContent:'stretch',
    flexDirection: "row",
    justifyContent:'space-between',
  },
  })