import React, {Component} from "react";
import { StyleSheet, Text, View ,TextInput,Button,ImageBackground} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-community/async-storage';
import LogInNav from './adminlognav';

export default class LogIN extends Component {

  constructor(props){
    super(props)
    this.state={
        email:'',
        password:'',
    }
}

    adminlogin=()=>{
      const{email}=this.state;  
      const{password}=this.state;
       
      fetch('http://192.168.1.115/project/adminlogin.php',{
           method:'POST',
           header:{
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({     
               email: email,
               password: password,
            })
       }) 
     
       .then((response)=> response.json())
      
       .then((responseJason)=>{
       
            if(responseJason === 'Enter email and password')alert(responseJason);
   
            else if(responseJason === 'Invalid Username or Password Please Try Again')alert(responseJason);
            else{        
             AsyncStorage.setItem('name',JSON.stringify(responseJason.name));
             AsyncStorage.setItem('userid',JSON.stringify(responseJason.userid));
             AsyncStorage.setItem('email',JSON.stringify(responseJason.email));
             this.props.navigation.navigate('Homeadmin');
            }
           })
           //error
           .catch((error)=>{
               console.error(error);
           })
       }

  render(){


    return (
      
        <View style={styles.container}>
          <ImageBackground style={styles.image} source={require("../images/2.jpg")}  >

          <View style={styles.Form}>
        
          <Text style={styles.Titles}>Welcome</Text>
            
            <View>
            <Text style={styles.Title}>Email :</Text>
            <TextInput 
            style={styles.input}
            placeholder='Enter your email here..'
            underlineColorAndroid='transparent'
            onChangeText={email => this.setState({email})} 
            />
            </View>
            
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

            
            <View>
            <Button 
             onPress={this.adminlogin}
             title='Log IN'
             color='#dc143c'
             />   


              </View>
   </View>
            
            
   </ImageBackground>
   
   <KeyboardSpacer/>
   
   </View>
  );
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
    },
    Form:{ 
        borderRadius:15,
        padding:10,
        paddingTop:40,
        paddingBottom:30,
        backgroundColor:'white',
        borderColor:'#dc143c',
        borderWidth:2,
        height:450,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 12,},
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    input:{

        textAlign:'center',
        borderWidth:1,
        padding:15,
        borderRadius:15,
        marginBottom:10,
        borderColor:'black',
        borderBottomColor:'black',
        width:250,
    },
    Title:{
       
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
    },
    Titles:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        paddingBottom:30,
        color:'#dc143c',//crimson
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems:"center",
      alignContent:"center",
      justifyContent:"center",
    },

  });