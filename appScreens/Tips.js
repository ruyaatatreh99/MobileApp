import React,{useState,useEffect} from 'react';
import { ScrollView,View,Button,StyleSheet,Text,FlatList} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TipsComp from '../components/TipsComp';
import { FontAwesome } from '@expo/vector-icons'; 
import style from '../style';


export default function Tips () {  

  const [tip, settip] = useState('');

  const readtips = () => {
    var RandomNumber = Math.floor(Math.random() * 21) + 1 ;
    fetch('http://192.168.1.107/project/gettips.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
      id:RandomNumber,
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      settip(responseJason);
       }).catch((error)=>{
       console.error(error);
      })
    }

    /*useEffect(() => {
       //readtips() 
     }, [])*/

  return(
    
    
   <ScrollView >
    <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>
    <Text style={style.Titles} >Tips</Text>
    <FontAwesome color='#dc143c' name="gittip" size={30}  style={{margin:5}} />
    </View>

    <View  style={{width: 'auto', height: 'auto',alignItems:'center',marginTop:20,}}>
    <TipsComp tip={tip}/>
   </View>

   <View style={{marginTop:15}}>
   <Button
        color='#dc143c'
        title=" get tip of the day"
        onPress={()=>readtips() }
      />
      </View>

  </ScrollView>
    );

}
