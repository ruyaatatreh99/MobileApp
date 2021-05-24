import React, {Component} from "react";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, Text, View ,TextInput,Button,ImageBackground,ActivityIndicator} from 'react-native';

export default class SignIn extends Component{

    constructor(props){
        super(props);
        this.state={
            name:'',email:'',password:'',phone:'',address:''
        }
    }

    userregester= () =>{
       
        const {name}=this.state;
        const {email}=this.state;
        const {password}=this.state;
        const {phone}=this.state;
        const {address}=this.state;
    
        fetch('http://192.168.1.113/project/signin.php',{
            method:'POST',
            header:{
                'Accept': 'application/json',
				'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone:phone,
                address:address
             })
        }) 
        //responce
        .then((response)=> response.json())
        //alarm msg
        .then((responseJason)=>{
            if(responseJason === 'email is not valid')alert(responseJason);
            if(responseJason === 'User Registered Successfully')alert(responseJason);
            if(responseJason === 'Email Already Exist, Please Try Again')alert(responseJason);
            if(responseJason === 'fill all information')alert(responseJason);
            if(responseJason === 'Mobile number must be 10 digit')alert(responseJason);
            if(responseJason === 'Password is weak')alert(responseJason);
            if(responseJason === 'Try Again')alert(responseJason);

        }).catch((error)=>{
            console.error(error);
        });

    }

    render(){
        const cancel=()=>{
            this.props.navigation.navigate('LogIn');
        }
        
    return (
      <View style={styles.container}>

        <ImageBackground style={styles.image} source={require("../images/2.jpg")}  >

          <View style={styles.Form}>
          <Text style={styles.Titles}>Creat new Account</Text>

          <View  style={styles.second} >
    <Text style={styles.Title}> Name: </Text>
              <TextInput
                   style={styles.input}
                    placeholder=' name'
                    underlineColorAndroid='transparent'
                    onChangeText={name => this.setState({name})}
               />
          </View>

          <View  style={styles.second} >
          <Text style={styles.Title}>Phone Number:</Text>
              <TextInput
                   style={styles.input}
                    placeholder='Phone Number'
                    underlineColorAndroid='transparent'
                    onChangeText={phone => this.setState({phone})}
               />
           </View>

           <View style={styles.second} >
               <Text style={styles.Title}>Email:</Text>
               <TextInput
                    style={styles.input}
                    placeholder='Email'
                    underlineColorAndroid='transparent'
                    onChangeText={email => this.setState({email})}
               />
           </View>

           <View style={styles.second} >
               <Text style={styles.Title}>Address:</Text>
               <TextInput
                    style={styles.input}
                    placeholder='Address'
                    underlineColorAndroid='transparent'
                    onChangeText={address => this.setState({address})}
               />
           </View>

           <View style={styles.second} >
               <Text style={styles.Title}>Password:</Text>
               <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='Password'
                    underlineColorAndroid='transparent'
                    onChangeText={password => this.setState({password})}
               />
           </View>

           

           <View > 
             <Button 
             title='Sign Up'
             color='#dc143c'
             onPress={this.userregester}
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
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 12,},
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
   
    },

    input:{
     
        textAlign:'center',
        borderWidth:1,
        padding:10,
        borderRadius:15,
        marginBottom:10,
        borderColor:'black',
        borderBottomColor:'black',
        height:40,
        width:180,

    },
    Title:{
       
        textAlign:'center',
        fontSize:17,
        
        padding:5,
        fontWeight:'bold',
        height:35,
    },
    Titles:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        paddingBottom:30,
        color:'#dc143c',//crimson
   
       
    },
    first:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:5,
        marginBottom:5, 
    },
    second:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
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