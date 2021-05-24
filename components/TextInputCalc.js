import React,{useState} from 'react';
import {Icon } from 'react-native-elements';
import { StyleSheet, View ,FlatList,TextInput,} from 'react-native';

export default function TextInputCalc({first,second,third,item,onClicks,texthand1,texthand2}) {
  
    return(
        <View>

        <View style={styles.row}>
            <TextInput style={styles.input} placeholder={first} />
            <TextInput style={styles.input} keyboardType='numeric' placeholder={second} onChangeText={()=>texthand1}/>
            <TextInput style={styles.input} keyboardType='numeric' placeholder={third} onChangeText={()=>texthand2}/>
            <Icon name='delete' color='#dc143c' size={25}  onPress={()=>onClicks(item.key)} />
            
            </View>
      
        </View>
    );
}

const styles = StyleSheet.create({
    Title:{
        textAlign:'center',
        fontSize:15,
        padding:5,
        fontWeight:'bold',
        height:35,
    },
    button:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    row:{
        padding:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#dd4e4e',
        borderBottomWidth:1,
    },

    input:{
        textAlign:'center',
        height:30,
        width:110,
    },
    
    inputs:{
        backgroundColor:'white',
        textAlign:'center',
        borderWidth:1,
        borderRadius:15,
        borderColor:'black',
        height:40,
        width:110, 
    },
    })
