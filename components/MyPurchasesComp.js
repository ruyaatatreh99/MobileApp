import React,{useState} from 'react';
import { Text,View,TextInput,StyleSheet,Image} from 'react-native';
import { Avatar,Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import style from '../style.js';
import AsyncStorage from '@react-native-community/async-storage';

export default function MyPurchasesComp ({item,deletion,bid}){
    const [count, setCount] = useState(1);
   
  const countitem=(pid,no,price)=>{
    setCount(no);
    fetch('http://192.168.1.113/project/setcount.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
         pid:pid,
         bid:bid,
         itemno:no,
         itemprice:price
       })
  }) 
   .then((response)=> response.json())
.then((responseJason)=>{
  if(responseJason === 'countin')alert(responseJason)
  if(responseJason === 'Try Again')alert(responseJason);
  else{
    AsyncStorage.setItem('total',JSON.stringify(responseJason));
  // alert(responseJason);
   }
 }).catch((error)=>{
      console.error(error);
  })
  }
 
    return(
<View style={styles.Form}>

<View style={style.second}> 

<View style={{marginLeft:15}} >

      <Image style={{width:100,height:100}} source={{uri:item.image}}></Image>
 </View>
 <Text style={{marginTop:15}}>{item.bio}</Text>

<View style={{marginRight:15,justifyContent:"center",}}>
<View style={style.title}><Text >{item.name} </Text></View>
<View style={styles.itemsno}>
 <Text style={{marginTop:3,}}>{item.price} </Text>
 <TextInput 
     editable={false}
     placeholderTextColor={'black'}
   /> 
 <Foundation name="dollar" size={20} color="black" />
 </View>
 </View>

 </View>
 <View style={styles.header}>
 <Icon style={{marginTop:10,marginLeft:10}}name='delete' color='gray' size={25} onPress={()=>deletion(item.pid)} />
 <View style={styles.itemsno}>
  <AntDesign name="minus" size={25} color='#dd4e4e'  onPress={()=>countitem(item.pid,count-1,item.price)}/>
 <Text>{count}</Text>
 <Icon  style={{marginRight:10}} name='add' color='#dd4e4e' size={25}  onPress={()=>countitem(item.pid,count+1,item.price)}/>
 </View>

 </View>

</View>
    );}

const styles = StyleSheet.create({
  
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
  })