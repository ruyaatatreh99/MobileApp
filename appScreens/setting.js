import React, {Component,useEffect,useState} from "react";
import { Text,ScrollView,View,Button,TextInput,Image,StyleSheet,ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import style from '../style.js';
import PhotoButton from "../components/PhotoButton";
import AsyncStorage from '@react-native-community/async-storage';

export default class  Setting extends Component { 

 constructor(props){
      super(props);
      this.state={
        name:'',email:'',password:'',phone:'',address:'',bio:'',image:null,userid:0    
      };
  }

  choosephoto  = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({image:result.uri,
                     data:result.data
      });
    }
  };

    editinfo = async() => {
      try {
        await AsyncStorage.getItem('userid').then((value) => {
          this.setState({"userid":eval(value)});
      });

      const {name}=this.state;
      const {email}=this.state;
      const {password}=this.state;
      const {phone}=this.state;
      const {address}=this.state;
      const {bio}=this.state;
      const {image}=this.state;
      const {userid}=this.state;

     fetch('http://192.168.1.113/project/editinfo.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({     
            name: name,
            email: email,
            password: password,
            phone:phone,
            address:address,
            bio:bio,
            image:image,
            userid:userid,
           })
      }) 
      //responce
      .then((response)=> response.json())
      .then((responseJason)=>{
         if(responseJason === 'Information edited Successfully')alert(responseJason);
        else{
          alert(responseJason);
        }
      }).catch((error)=>{
          console.error(error);
      })
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

render(){

  const{image}=this.state;
      return(
        <ScrollView>
          <View style={style.continer}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/*<Button title="choose photo" onPress={this.choosephoto} />*/}
            <View style={{marginTop:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200,borderRadius:100 }} />}
              <PhotoButton onpressb={()=>this.choosephoto()}/>
            </View>
          </View>

          <View style={style.B}>
            <Button  color='#dc143c' title='save' onPress={this.editinfo} ></Button>
          </View>

          <Text style={style.tex}>Name</Text>
          <TextInput style={style.input}  underlineColorAndroid='transparent' onChangeText={name => this.setState({name})}></TextInput>

          <Text style={style.tex}>Email</Text>
          <TextInput style={style.input} underlineColorAndroid='transparent'onChangeText={email => this.setState({email})}></TextInput>

          <Text style={style.tex}>password</Text>
          <TextInput secureTextEntry={true} style={style.input} underlineColorAndroid='transparent' onChangeText={password => this.setState({password})}></TextInput>

          <Text style={style.tex}>Address</Text>
          <TextInput style={style.input} underlineColorAndroid='transparent' onChangeText={address => this.setState({address})} ></TextInput>

          <Text style={style.tex}>Phone Number</Text>
          <TextInput style={style.input}  underlineColorAndroid='transparent' onChangeText={phone => this.setState({phone})}></TextInput>

          <Text style={style.tex}>Bio</Text>
          <TextInput style={style.input} underlineColorAndroid='transparent' onChangeText={bio => this.setState({bio})} ></TextInput>
          
          <KeyboardSpacer/>
          <KeyboardSpacer/>
          
        </View>
      </ScrollView>

      );
   }
 }