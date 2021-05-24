import React, {Component} from "react";
import { StyleSheet, Text, View ,TextInput,Button,ImageBackground,ActivityIndicator} from 'react-native';
import LogInNav from '../navigators/loginNavigator';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class ForgetPass extends Component {
  
    constructor(props){
        super(props);
        this.state={
            email:'',Rpassword:'',newpassword:''
        }
    }

    changepassword=()=>{
    
        const{email}=this.state;
        const{newpassword}=this.state;
        const{Rpassword}=this.state;

        fetch('http://192.168.1.113/project/changepassword.php',{
            method:'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                email: email,
                Rpassword: Rpassword,
                newpassword:newpassword
             })
        }) 
        //responce
        .then((response)=> response.json())
        //alarm msg
        .then((responseJason)=>{
            if(responseJason === 'Password is weak')alert(responseJason);
            if(responseJason === 'passwords not match!')alert(responseJason);
            if(responseJason === 'Email Not Exist, Please Try Again')alert(responseJason);
            if(responseJason === 'fill all information')alert(responseJason);
            if(responseJason === 'password updatated Successfully')alert(responseJason);
           

        })
        //error
        .catch((error)=>{
            console.error(error);
        })
        

    }

    render(){
        const cancel=()=>{
            this.props.navigation.navigate('LogIn');
        }
    return (
        <View style={styles.container}>

            <ImageBackground style={styles.image} source={require("../images/2.jpg")}  >

      <View style={styles.Form}>
        
          <Text style={styles.Titles}>Set New Password</Text>
            
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
            <Text style={styles.Title}>New Password :</Text>
            <TextInput 
            secureTextEntry={true}
            style={styles.input}
            placeholder='Password'
            underlineColorAndroid='transparent'
            onChangeText={newpassword => this.setState({newpassword})}
            />
            </View>

            <View>
            <Text style={styles.Title}>Repeat Password :</Text>
            <TextInput 
            secureTextEntry={true}
            style={styles.input}
            placeholder='repeat Password'
            underlineColorAndroid='transparent'
            onChangeText={Rpassword => this.setState({Rpassword})} 
            />
            </View>
            
            <View>
            <Button 
             title='Change'
             color='#dc143c'
             onPress={this.changepassword}
             />   
            <Button 
             title='cancel'
             color='#dc143c'
             onPress={()=>cancel()}
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
        justifyContent:"center"
    },
    Form:{
        
        borderRadius:15,
        padding:10,
        paddingTop:40,
        paddingBottom:30,
        width:300,
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