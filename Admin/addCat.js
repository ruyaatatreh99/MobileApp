import React, {Component, useState,useEffect} from "react";
import 'react-native-gesture-handler'
import {View,Text,StyleSheet,TextInput,Button,Image,ScrollView,TouchableOpacity} from 'react-native';
import { BottomSheet,ListItem} from 'react-native-elements'; 
import styles from '../Global/addProductStyle';
import PhotoButton from "../components/PhotoButton";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

    export default function AddCat () {  

    const [catname,Setcattname]=useState(' ');
    const [visible, setVisible] = useState(false);
    const [image,Setimage]=useState(' '); 

  const  choosephoto  = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          Setimage(result.uri,result.data);
        }
      };
    const  takephoto  = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
          }
        //const getCameraPermission = await ImagePicker.getCameraPermissionsAsync();
        else{
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,

        });
        Setimage(result.uri,result.data );}

      };

   const addcat= async()=>{
               
         fetch('http://192.168.1.115/projet/addcat.php',{
             method:'post',
             header:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({     
                name: catname,
                imag:image,
              })
         }) 
         //responce
          .then((response)=> response.json())
      .then((responseJason)=>{
        if(responseJason === 'fill all information')alert(responseJason);
         if(responseJason === 'category added Successfully')alert(responseJason);

        else{
          alert(responseJason);
        }
         //error
        }).catch((error)=>{
             console.error(error);
         })
     }

     useEffect(() => {
   
      });

  
 
      const toggleBottomNavigationView = () => { setVisible(!visible); };
      const list = [
        { title: 'Take Photo', onPress: () => takephoto() },
        { title: 'Choose Photo from Library' , onPress: () => choosephoto()},
        { title: 'Cancel', containerStyle: { backgroundColor: 'lightgray' }, titleStyle: { color: 'white' },
          onPress: () => setVisible(false),
        },
      ];

    return(
<View style={{width:'96%',backgroundColor:'lightgray',borderRadius:15}}>

  <Text style={styles.Title}>Add a new Category</Text>
  <View style={{padding:10}}>

        {image && <Image source={{ uri: image }} style={{ width: 250, height: 150 }} />}
        <PhotoButton onpressb={toggleBottomNavigationView}/>
        </View>
        <BottomSheet isVisible={visible} >

   {list.map((l, i) => (
    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
      <ListItem.Content>
        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ))}
</BottomSheet>



  <View style={{flexDirection:'row'}}>
      <Text style={styles.Title}>Category Name:</Text>
      <TextInput style={styles.input}  placeholder='Category name' onChangeText={catname => Setcattname(catname)}  />
      </View>

   
   <Button  title='ADD' color='#dc143c'  onPress={ addcat}/> 
   </View>
    );
    }