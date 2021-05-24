import 'react-native-gesture-handler'
import React,{Component, useState} from 'react';
import {View,ScrollView,Text,StyleSheet,Button} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Avatar, Divider,Overlay,Icon } from 'react-native-elements';
import AddProduct from './AddProduct';
import ProductPost from '../components/ProductPost';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class Delete extends Component  {   
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',userid:0
        }
    }
      
    userDelete= async()=>{

        try{
            await AsyncStorage.getItem('userid').then((value) => {
                this.setState({"userid":eval(value)});
              
            });

         const{password}=this.state;
         const{email}=this.state;
         const {userid}=this.state;
         fetch('http://192.168.1.113/project/deleteaccount.php',{
             method:'post',
             header:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({     
                password:password,
                email: email,
                userid:userid,       
              })
         }) 
         //responce
          .then((response)=> response.json())
      .then((responseJason)=>{
        if(responseJason === 'Account deleted') {alert(responseJason);/*()=>pressHandlerdelete()*/}
        if(responseJason === 'Enter email and password')alert(responseJason);
        if(responseJason === 'Invalid Username or Password Please Try Again')alert(responseJason);
        if(responseJason === 'Try Again')alert(responseJason);

        else{
          alert(responseJason);
        }
         //error
        }).catch((error)=>{
             console.error(error);
         })
        } catch (e) {
            alert('Failed to fetch the data from storage')
          }
     }

  render(){
    const pressHandlerdelete=()=>{
        this.userDelete();
        AsyncStorage.clear();
        this.props.navigation.pop();
      }

    return (  
      <ScrollView>  
          <View style={{padding:20,alignContent:'center',paddingTop:40}}>
              <Text style={styles.Titles}>Delete Account </Text>
              <Divider style={{backgroundColor:'#dc143c',margin:10,marginTop:20}}/>
        <View style={styles.container}>
       <View style={{flexDirection:'row',flex:1,paddingTop:20}}>
            <View>
            <Text style={styles.Title}>Email:</Text>
            <TextInput 
            style={styles.input}
            placeholder='Email'
            underlineColorAndroid='transparent'
            onChangeText={email => this.setState({email})} 
            />
            </View>
        </View>
        <View style={{flexDirection:'row',flex:1,paddingTop:10,paddingBottom:20}}>
            <View>
            <Text style={styles.Title}>Password :</Text>
            <TextInput 
            secureTextEntry={true}
            style={styles.input}
            placeholder='Password'
            underlineColorAndroid='transparent'
            onChangeText={password => this.setState({password})}
            />
            </View>
        </View>
        </View>
            <View>
                <Text style={{padding:20,paddingLeft:30,alignContent:'center',color:'gray'}}>
                    Please note that by deleting this account you wont be able to open your account anymore
                </Text>
            </View>
       <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,}}/>
       <View style={{paddingTop:20}}>
          <Button onPress={()=>pressHandlerdelete()} style={{paddingTop:30}} title='Delete' color='red' /> 
       </View>
       </View>
       <KeyboardSpacer/>
      </ScrollView>
    );   
  }
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