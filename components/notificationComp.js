import React,{useState,useEffect} from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, Text, View ,TextInput,FlatList,ScrollView,TouchableOpacity,Button,Image} from 'react-native';
import styles from '../Global/calcstyle';
import { Overlay } from 'react-native-elements';
import Styles from '../style';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

export default function notificationComp({item}) {

    const [dvisible, setdVisible] = useState(false);
    const [avisible, setaVisible] = useState(false);
    const[msgtext,setmsgtext]=useState('');
    const[userid,setuserid]=useState(0);
    const[image,setimage]=useState('');
    const[sname,setname]=useState('');
    const [type,Settype]=useState(' '); 
const readuserid=async()=>{
      await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });
      await AsyncStorage.getItem('image').then((value) => {setimage(eval(value)); });
      await AsyncStorage.getItem('name').then((value) => {setname(eval(value)); });
     } 
const senddecline=(bid,bname,name)=>{
    fetch('http://192.168.1.113/project/sendmsg.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({     
          sid:userid,
          msgtext:msgtext,
          bid:bid,
          sname:sname,
          bname:bname,
          simage:image,
          status:'decline',
          name:name
        })
      }) 
      .then((response)=> response.json())
      .then((responseJason)=>{
        if(responseJason === 'message sent')alert(responseJason);
         }).catch((error)=>{
         console.error(error);
        })
      }
const sendaccept=(bid,bname,name)=>{
    fetch('http://192.168.1.113/project/sendmsg.php',{
    method:'post',
    header:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({     
      sid:userid,
          msgtext:msgtext,
          bid:bid,
          sname:sname,
          bname:bname,
          simage:image,
          status:'accept',
          name:name
    })
  }) 
  .then((response)=> response.json())
  .then((responseJason)=>{
    if(responseJason === 'message sent')alert(responseJason);
     }).catch((error)=>{
     console.error(error);
    })
  }
const Decline = () => {
    setdVisible(!dvisible);
}
const Accept = () => {
    setaVisible(!avisible);
}
useEffect(() => {
  readuserid()
},[])
    return (
        <ScrollView >
            <View >
                <View style={s.Form}>
                <Text style={styles.Title} >{item.name}  </Text>
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <View>
                    <Text>Item Number: {item.itemno}</Text>
                    <Text>Name :{item.username}</Text>
                    <Text>Address :{item.address}</Text>
                    <Text>Phone: {item.phone}</Text>
                    </View>
                    <View style={{paddingLeft:100,paddingBottom:10}}>
                        <Image style={{width:100,height:100}} source={{uri:item.image}}></Image></View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                    <TouchableOpacity style={s.button} onPress={()=>Accept()} >
                    <Text style={styles.Title}>Accept</Text>
                    </TouchableOpacity>

                    <Overlay isVisible={avisible} onBackdropPress={()=>Accept()} style={s.sth}  >  
                    <View style={{marginTop:10,marginBottom:10,width:300,height:200,alignItems:'center',borderRadius:10}}>
                    <Text style={{padding:8,marginBottom:5}}>write  a message</Text>
                    <Text style={{padding:8,marginBottom:5}}>*give more details about order</Text>
                    <TextInput style={{padding:10,borderWidth:1,width:'95%',borderRadius:5,marginBottom:15}}  placeholder='write' onChangeText={(msgtext) => setmsgtext(msgtext)} />
                    <Button  style={{padding:5,marginTop:8,paddingTop:10}} title='Send' color='#dc143c' onPress={()=>sendaccept(item.bid,item.username,item.name)} /> 
                    </View>
                    </Overlay>

                    <TouchableOpacity style={s.button2} onPress={()=>Decline()} >
                    <Text style={styles.Title}>Decline</Text>
                    </TouchableOpacity>

                    <Overlay isVisible={dvisible} onBackdropPress={()=>Decline()} style={s.sth}>    
                    <View style={{marginTop:10,marginBottom:10,width:300,height:200,alignItems:'center',borderRadius:10}}>
                    <Text style={{padding:8,marginBottom:5}}>write  a message</Text>
                    <Text style={{padding:8,marginBottom:5}}>*give reason why order cancel</Text>
                   {/* <TextInput style={{padding:10,borderWidth:1,width:'95%',borderRadius:5,marginBottom:15}}  placeholder='write' onChangeText={(msgtext) => setmsgtext(msgtext)} />*/}
                    <View style={{padding:10,borderWidth:1,width:'95%',borderRadius:5,marginBottom:15}}>
<RNPickerSelect 

onValueChange={itemValue => setmsgtext( itemValue )}
            items={[
                { label: 'Out of stock', value: 'Out of stock' },
                { label: 'Out of range', value: 'Out of range' },
                { label: 'Not enough time', value: 'Not enough time' },
                { label: 'Large quntity', value: 'Large quntity' },
            ]}
            
        />
   </View>
                    <Button  style={{padding:5,marginTop:8,paddingTop:10}} title='Send' color='#dc143c' onPress={()=>senddecline(item.bid,item.username,item.name)} /> 
                    </View>
                    </Overlay>

                    </View>
                </View>
            </View>
            <KeyboardSpacer/>
    </ScrollView>
          );
      }
      const s = StyleSheet.create({
        button: {
          alignItems: "center",
          backgroundColor: "#dc143c",
          padding: 10,
          borderRadius:10
        },
        button2: {
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
            borderRadius:10
          },
          Form:{
            borderRadius:15,
            padding:10,
            paddingTop:30,
            paddingBottom:30, 
            backgroundColor:'white',
            height:'auto',
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 5.00,
            elevation: 4,
            marginBottom:10
        }, 
        sth:{
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 5.00,
            elevation: 4,
        }
      });