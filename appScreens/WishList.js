import React,{useState,useEffect} from 'react';
import {ScrollView, Text,View,StyleSheet, FlatList,ActivityIndicator} from 'react-native';
import { Divider } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons'; 
import style from '../style.js';
import WishListComp from '../components/WishListComp';
import AsyncStorage from '@react-native-community/async-storage';
import { useContext } from 'react';

export default function WishList (){

  const [wish,setwish]=useState([]);
  const [wishtext,setwishtext]=useState('');
  const[userid,setuserid]=useState(0);
  const readuserid=async()=>{ await AsyncStorage.getItem('userid').then((value) => {
      setuserid(eval(value)); });} 

  const deletep=(idd)=>{//on the todo
    setwish((prevwishes)=>{
      return prevwishes.filter(wish => wish.pid!=idd);
    })
    fetch('http://192.168.1.113/project/deletewish.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        pid:idd,  
        bid:userid , 
       })
  }) 
  //responce
  .then((response)=> response.json())
  //alarm msg
  .then((responseJason)=>{
    if(responseJason === 'product Deleted')alert(responseJason);
    if(responseJason === 'Try Again')alert(responseJason);

  }).catch((error)=>{
    console.error(error);
    });
  }

  const[itemno,setitemno]=useState(0);
  const readitemno=async()=>{ await AsyncStorage.getItem('itemno').then((value) => {
      setbitemno(eval(value));
    
  });}
  

  const readData = async () => {
  fetch('http://192.168.1.113/project/getwishlist.php',{
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
    if(responseJason === 'No product in wishlist')setwishtext(responseJason);
    else {setwish(responseJason.results);
      setwishtext(' '); }
     }).catch((error)=>{
     console.error(error);
    })
  }

  

  useEffect(() => {
    readuserid()
    readData()
    //readitemno()
  })
  


  return (
    
    <ScrollView >
      

    <View style={styles.container}>

    <View style={{flexDirection:'row',justifyContent:'center'}}>
      <Text style={style.Titles} >Wish List  </Text>
      <Foundation name="heart" size={30} color="red" />
      <Foundation name="heart" size={20} color="red" />
    </View>

   <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,height:0.7}}/>
  <Text style={{fontSize:16,color:'#dc143c',marginLeft:20}}>{wishtext}</Text>
   <View style={styles.purchases}>
        <FlatList
          data={wish}
          renderItem={({item})=>(
            <WishListComp item={item} deletion={deletep} />
          ) } />
     
    </View>
    </View>
    

</ScrollView>

  );  
}  

const styles = StyleSheet.create({
  container:{
    margin:20,
    marginTop:25,
    justifyContent:'center',
  },

  purchases:{
    marginTop:5,
  },
})