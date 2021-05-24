import 'react-native-gesture-handler'
import React,{useState} from 'react';
import {View,StyleSheet,TextInput} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';

export default function ProfileComponent(){
    return(
        <View >
        <View style={Styles.container}>
            <View >
              <Avatar 
                size="large"
                rounded
                icon={{name: 'user', color: 'white', type: 'font-awesome' }}
                overlayContainerStyle={{backgroundColor: 'gray'}}
                activeOpacity={0.1}>
              </Avatar> 
            </View>

            <View>
              <TextInput 
                style={Styles.txt}
                placeholder='User Name'
                editable={false}
                placeholderTextColor={'black'}/> 
            </View>
            
        </View>
        <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,}}/>
        </View>
    );
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:120,
        width:'auto',
        alignItems:'center',
        justifyContent:'space-around',
        margin:15,
    },
    txt:{
        marginTop:40,
        fontFamily:'Cochin',
        fontSize:20,
        color:'#dc143c',//crimson
    }
})