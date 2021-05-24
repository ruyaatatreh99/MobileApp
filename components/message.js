import 'react-native-gesture-handler'
import React,{useState,useEffect} from 'react';
import {View,ScrollView,Text,FlatList,Image,SafeAreaView,StyleSheet,Button} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style';
export default function message ({route,navigation}) {  
  
  const { id } = route.params;
  const userid=eval(id);
  const [msg,setmsg]=useState([]);
  const [text,settext]=useState(' ');
  const [l,setl]=useState(0);
  const [msgn,setmsgn]=useState('');

  const goback=()=>{
    console.log('dldd')
    navigation.pop()   
  }
  const msgnotiffication=()=>{
 if(l>=1){
setmsgn('check for new  messages');
 }
 else{
  setmsgn('start your own business');
 }
  }
  const readData =()=>{
    fetch('http://192.168.1.107/project/getmsg.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        userid:userid,
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason === 'No message Yet')settext(responseJason);
      else {setmsg(responseJason.results);settext('');setl(msg.length); }
       }).catch((error)=>{
       console.error(error);
      })}

      const Deletemsg=(sid,bid,text)=>{//on the todo
       setmsg((prevmsg)=>{
          return prevmsg.filter(msg => msg.text!=text);
        })
        fetch('http://192.168.1.107/project/deletemsg.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({     
            sid:sid,
            bid:bid,
            text:text,
           })
      }) 
      //responce
      .then((response)=> response.json())
      //alarm msg
      .then((responseJason)=>{
        if(responseJason === 'message Deleted')alert(responseJason);
        if(responseJason === 'Try Again')alert(responseJason);
    
      }).catch((error)=>{
        console.error(error);
    });
      }
      useEffect(() => {
       readData();
       msgnotiffication(); 
      })
  
  
  return (  
      <ScrollView>  
        <Button  title='goback' onPress={()=>goback()} />
            <View style={{flexDirection:'row',justifyContent:'center',paddingTop:10}}>
               <Text style={Styles.Titles} >messages</Text>
               <AntDesign name="message1" style={{marginTop:-4,marginLeft:5}}size={25} color="#dc143c" />
            </View>
       <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,height:1}}/>
       <Text style={{padding:6,fontSize:15}}> {text} </Text>
       <SafeAreaView style={{flex:1,justifyContent:'center'}}>
 
     <FlatList
          data={msg}  
          renderItem={({item})=>(
            <View style={styles.Form}>
               <MaterialIcons name='delete' size={24} color='#333' style={{marginRight:15}} onPress={()=>Deletemsg(item.sid,item.bid,item.text)}/>
            <View style={styles.second}> 
                 <View style={{padding:10}}><Image style={{width:75,height:75,borderRadius:35}} source={{uri:item.simage}}></Image></View>
                 <View style={{paddingRight:10,paddingLeft:5,flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                  <Text style={styles.Title} >{item.sname}</Text>
                  <Text style={styles.Title} >Product name: {item.productname}</Text>
                  <Text style={{paddingRight:45}}>{item.text}</Text>
                  </View>
                 
                </View>
              </View>
              </View> 
          
          )}  />


          </SafeAreaView>
      </ScrollView>
    );   
}
const styles = StyleSheet.create({
  second:{
    flex:1,
    flexDirection:'row',
  },
  Title:{
    padding:5,
    fontWeight:'bold',
    height:35,
   
  },
  
    itemsno:{
      width:'auto',
      flexDirection:'row',
      marginTop:5,
      justifyContent:'center'
    },
  
    header:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
  
    Form:{
      margin:10,
      flexDirection:'row',
      borderRadius:15,
      padding:10,
      paddingTop:15,
      paddingBottom:20, 
      backgroundColor:'white',
      height:'auto',
      shadowColor: "#000",
      shadowOffset: {	width: 0,	height: 5},
      shadowOpacity: 0.28,
      shadowRadius: 5.00,
      elevation: 4,
      marginBottom:10
  }, 
  })