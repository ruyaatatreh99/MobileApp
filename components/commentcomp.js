import React,{useState,useEffect} from 'react';
import { Text,View,TextInput,StyleSheet,Image} from 'react-native';
import { Foundation } from '@expo/vector-icons';

export default function CommentComp ({image,name,comment,id}){
  const report=(id)=>{
    fetch('http://192.168.1.113/project/report.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
         id: id,
       })
  }) 
  //responce
   .then((response)=> response.json())
.then((responseJason)=>{
  if(responseJason === 'Report comment')alert(responseJason);
  //error
 }).catch((error)=>{
      console.error(error);
  })
}
  
    return(   
      <View style={styles.Form}>
        <Foundation name='alert' color='gray' size={25} onPress={()=>report(id)} />
        <View style={styles.second}> 
        <View style={{padding:10}}><Image style={{width:75,height:75,borderRadius:35}} source={{uri:image}}></Image></View>
            <View style={{paddingRight:10,paddingLeft:5}}>
              <Text style={styles.Title} >{name}</Text>
              <Text style={{paddingRight:45}}>{comment}</Text>
            </View>
          </View>
        </View>
      

    );}

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