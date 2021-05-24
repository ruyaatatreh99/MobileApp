import React,{useState,useEffect} from 'react';
import { Text,View,TextInput,StyleSheet,Image,FlatList,Button,ScrollView} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Editcat from './editcat';
import { Foundation } from '@expo/vector-icons';
import style from '../style';


export default function Reportitem ({navigation}){

  const[report,setreport]=useState([]);
  const [text,settext]=useState(' ');

  const delet1=(id)=>{//on the todo
    setreport((prevcat)=>{
      return prevcat.filter(report=> report.id!=id);
    })
    fetch('http://192.168.1.115/project/deletcomment.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        id:id,   
       })
  }) 
  //responce
  .then((response)=> response.json())
  //alarm msg
  .then((responseJason)=>{
    if(responseJason === 'comment Deleted')alert(responseJason);
    if(responseJason === 'Try Again')alert(responseJason);

  }).catch((error)=>{
    console.error(error);
    });
  }


  const getreport = () => {
    fetch('http://192.168.1.115/project/getreport.php',{
method:'post',
header:{
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({     

})
}) 
.then((response)=> response.json())
.then((responseJason)=>{
if(responseJason === 'No report Yet')settext(responseJason);
else {setreport(responseJason.results);settext(''); }
}).catch((error)=>{
console.error(error);
})
} 

useEffect(() => {
  getreport(); 
})

    return(   
  <ScrollView>

<View style={style.nav}></View>

<Button 
            onPress={()=>navigation.navigate('Homeadmin')}
             title='go back'
             /> 

<View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
    <Text style={style.Titles} >comments</Text>
    </View>
        <FlatList
        inverted
        data={report}  
        renderItem={({item})=>(
          <View style={{flexDirection:'column'}}>
       <View style={styles.Form}>
         <View style={{flexDirection:'row'}}>
       <MaterialIcons name="delete" size={25} color="gray" style={{padding:5}} onPress={()=>delet1(item.id)} />
          <Text style={{padding:5}}>{item.report}</Text>
          <Foundation name='alert' color='gray' size={25} style={{padding:5}} />
          </View>
        <View style={styles.second}> 
        <View style={{padding:10}}><Image style={{width:75,height:75,borderRadius:35}} source={{uri:item.image}}></Image></View>
            <View style={{paddingRight:10,paddingLeft:5}}>
              <Text style={styles.Title} >{item.name}</Text>
              <Text style={{paddingRight:45}}>{item.comment}</Text>
            </View>
          </View>
        </View>
        </View>
      

          
          


        )}/>
      
      </ScrollView>
    );}

const styles = StyleSheet.create({
  second:{
    flex:1,
    flexDirection:'row',
  },  
  
    Form:{
      margin:10,
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
      marginBottom:10,
      width:'95%'
  }, 
  })