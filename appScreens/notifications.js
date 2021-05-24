import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput,FlatList,ScrollView,TouchableOpacity,Button} from 'react-native';
import {  Divider } from 'react-native-elements';
import NotComp from '../components/notificationComp';
import styles from '../Global/calcstyle';
import Styles from '../style';
import AsyncStorage from '@react-native-community/async-storage';
import Searchnav from '../navigators/searchnav';
import msgnav from '../navigators/msgnav'
import Message from '../components/message';
export default function notifications ({navigation}) {

const [number,setnumber]=useState(0);
const [text,settext]=useState('');
const [orderItem,setOrderItem]=useState([])
const[userid,setuserid]=useState(0);
const readuserid=async()=>{
   await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });
 
  } 
  const show =()=>{
    navigation.navigate('Messages',{id:userid});
}
    const readData =  () => {
      fetch('http://192.168.1.113/project/getorder.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({     
        userid:userid
        })
      }) 
      .then((response)=> response.json())
      .then((responseJason)=>{
        if(responseJason === 'No Notification')settext(responseJason);
        else {setOrderItem(responseJason.results); 
        settext(' ');
      setnumber(orderItem.length)}
         }).catch((error)=>{
         console.error(error);
        })
      }
  useEffect(() => {
    readuserid()
   readData()
  })
    return (
        <ScrollView >
            <View style={st.container}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
               <Text style={Styles.Titles} >Notifications</Text>
               <View style={st.round}><Text style={{margin:6}}>{number}</Text></View>
            </View>
            <Button  title='View message' color='#dc143c' onPress={()=>show()}  /> 
            
            <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,marginTop:10}}/>
            <Text style={{fontSize:16,color:'#dc143c',marginLeft:20}}>{text}</Text>
  
            <View >
   <FlatList
          data={orderItem}
          renderItem={({item})=>(
           <NotComp item={item}/>
   
          ) } />
   </View>
            </View>
    </ScrollView>
          );
      }

      const st = StyleSheet.create({  
        container:{
         justifyContent:'center',
            marginTop:25,
            padding:10
            
          },
        purchases:{
          marginTop:5,
          marginBottom:150,
  
        },
        round:{
            height:26,
            width:26,
            borderRadius:13,
            backgroundColor:'red',
            margin:9

        }
      })