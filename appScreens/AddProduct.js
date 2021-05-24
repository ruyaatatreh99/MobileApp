import React, {Component, useState,useEffect} from "react";
import 'react-native-gesture-handler'
import {View,Text,StyleSheet,TextInput,Button,Image,ScrollView,TouchableOpacity} from 'react-native';
import { BottomSheet,ListItem} from 'react-native-elements'; 
import styles from '../Global/addProductStyle';
import PhotoButton from "../components/PhotoButton";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

    export default function AddProduct () {  

    const [productname,Setproductname]=useState(' ');
    const [discription,Setdiscription]=useState(' ');
    const [price,setprice]=useState(0);
    const [state,setstete]=useState(1);

    const [type,Settype]=useState(' '); 
    const [image,Setimage]=useState(' '); 
    const [userid,Setuserid]=useState(0); 
    const [visible, setVisible] = useState(false);
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

      const readid = async () => {
        try {
            const userid = await AsyncStorage.getItem('userid');
            if (userid !== 0) {
                Setuserid(eval(userid))
              }  
            
      } catch (e) {
        alert('Failed to fetch the data from storage')
      }
    }

   const addproduct= async()=>{

        try{
              
         fetch('http://192.168.1.113/project/AddProduct.php',{
             method:'post',
             header:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({     
                productname: productname,
                discription: discription,
                price:price,
                type:type,
                image:image,
                userid:userid,
                state:state,
              })
         }) 
         //responce
          .then((response)=> response.json())
      .then((responseJason)=>{
         if(responseJason === 'product added Successfully')alert(responseJason);

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
     useEffect(() => {
        readid();
      });

  
 
      const toggleBottomNavigationView = () => { setVisible(!visible); };
      const list = [
        { title: 'Take Photo', onPress: () => takephoto() },
        { title: 'Choose Photo from Library' , onPress: () => choosephoto()},
        { title: 'Cancel', containerStyle: { backgroundColor: 'red' }, titleStyle: { color: 'white' },
          onPress: () => setVisible(false),
        },
      ];
    return(

 <ScrollView style={styles.Form}>

  <Text style={styles.Titles}>Add a new Product</Text>
  <View style={{marginTop:10,marginBottom:10}}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200,borderRadius:100 }} />}
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

  <View  style={styles.second} >
      <Text style={styles.Title}>Product Name:</Text>
      <TextInput style={styles.input}  placeholder='product name' onChangeText={productname => Setproductname(productname)}  />
  </View>

  <View  style={styles.second} >
  <Text style={styles.Title}>Describe:</Text>
      <TextInput style={styles.input} placeholder='describe' onChangeText={discription => Setdiscription(discription)} />
   </View>
   <View  style={styles.second} >
  <Text style={styles.Title}>Type:</Text>

    <View style={styles.input}>
<RNPickerSelect 
onValueChange={itemValue => Settype( itemValue )}

            items={[
                { label: 'Food', value: 'Food' },
                { label: 'Sweet', value: 'Sweet' },
                { label: 'Art', value: 'Art' },
                { label: 'Craft', value: 'Craft' },
                { label: 'Jewelery', value: 'Jewelery' },
                { label: 'Paintings', value: 'Paintings' },
                { label: 'Furniture', value: 'Furniture' },
                { label: 'clothes and knitting', value: 'clothes and knitting' },
                { label: 'others', value: 'others' },
            ]}
        />
   </View>
   </View>
   <View style={styles.second} >
       <Text style={styles.Title}>Price:</Text>
       <TextInput style={styles.input} placeholder='price' onChangeText={price => setprice(price)} />
   </View>
   
   <Button  title='ADD' color='#dc143c'   onPress={ addproduct}/> 

   </ScrollView>
    );
    }