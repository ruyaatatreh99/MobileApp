import 'react-native-gesture-handler'
import React,{ useState} from 'react';
import {View,ScrollView,Text,StyleSheet,Button,FlatList,Alert} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Avatar, Divider,Overlay,Icon } from 'react-native-elements';
import Styles from '../style';
import { TextInput } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons'; 
import CommentComp from '../components/commentcomp';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddComment({post}) {

    const [text,setText]=useState('');//to keep track of user input

    const ChangeHandler =(val)=>{ //when fire takes the value puts it in val 
       setText(val);
    } 
    
    return (
        <ScrollView>  
        <View style={{padding:10,alignContent:'center'}}>

           <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={Styles.Titles}>Comments</Text>
                <Octicons name="comment" size={25} style={{paddingBottom:10}} color="#dc143c" />
            </View>

            <View>
              <Text style={{paddingLeft:30,alignContent:'center',color:'gray'}}>
                  add youre comment advice for other user to see 
              </Text>
            </View>

          <Divider style={{backgroundColor:'#dc143c',margin:10,marginTop:10}}/>

          <View style={styles.container}>
            <View style={{flexDirection:'row',flex:1,paddingTop:10,paddingBottom:5}}>
              <View>
                <TextInput 
                multiline={true} 
                   style={styles.input}
                   placeholder='comment ...'
                   underlineColorAndroid='transparent'
                   onChangeText={ChangeHandler}
                />
          </View>
          <View>
              <Button onPress={()=>post(text)} title='post' color='#dc143c' />
          </View>
       </View>
      </View>

     <Divider style={{backgroundColor:'#dc143c',margin:10,marginTop:20}}/>

     </View>
     <KeyboardSpacer/>
    </ScrollView>
          );
      }

      const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor:'lightgray',
            borderRadius:20,
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 4.00,
            elevation: 4,
        },
        input:{
            textAlign:'center',
            borderWidth:1,
            padding:15,
            borderRadius:15,
            marginBottom:10,
            borderColor:'red',
            borderBottomColor:'black',
            width:250,
        },
        Title:{  
            textAlign:'center',
            fontSize:15,
            paddingBottom:5,
        },
        Titles:{
            textAlign:'center',
            fontSize:30,
            fontWeight:'bold',
            paddingBottom:30,
            color:'#dc143c',//crimson
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 4.00,
            elevation: 4,
        },
      });