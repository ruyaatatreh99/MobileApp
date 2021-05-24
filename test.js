import React, {Component} from "react";
import { Text,ScrollView,View,Button,TextInput,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-community/async-storage';

export default class  Setting extends Component { 

 constructor(props){
      super(props);
      this.state={
      email:'',image:null,  
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
        await AsyncStorage.getItem('email').then((value) => {
          this.setState({"email":value});
      });

      const {email}=this.state;
      const {image}=this.state;

     fetch('http://192.168.1.113/project/editinfo.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({     
            email: email,
            image:image,
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
          <View >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{marginTop:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200,borderRadius:100 }} />}
              <Text onPress={()=>this.choosephoto()}></Text>
            </View>
          </View>
          <View style={{ width: 200, height: 200}} >
            <Button  color='#dc143c' title='save' onPress={this.editinfo} ></Button>
          </View>
        </View>

      );
   }
 }