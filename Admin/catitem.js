import React,{useState,useEffect} from 'react';
import { Text,View,TextInput,StyleSheet,Image,FlatList,Button} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Editcat from './editcat';
import style from '../style';


export default function Catitem ({navigation}){

  const [visible, setVisible] = useState(false);
  const [text,settext]=useState(' ');
  const[cat,setcat]=useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const delet=(id)=>{//on the todo
    setcat((prevcat)=>{
      return prevcat.filter(cat=> cat.id!=id);
    })
    fetch('http://192.168.1.115/project/deletcat.php',{
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
    if(responseJason === 'cat Deleted')alert(responseJason);
    if(responseJason === 'Try Again')alert(responseJason);

  }).catch((error)=>{
    console.error(error);
    });
  }

  const readData =() => {
      
  fetch('http://192.168.1.115/project/getcats.php',{
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
    if(responseJason === 'No cat Yet')settext(responseJason);
    else {setcat(responseJason.results);settext(''); }
     }).catch((error)=>{
     console.error(error);
    })
  }

  useEffect(() => {
    readData(); 
  })
  
    return(   

      <View>

      <View style={style.nav}></View>
      <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
    <Text style={style.Titles} >categories</Text>
    </View>
      <Button 
            onPress={()=>navigation.navigate('Homeadmin')}
             title='go back'
             /> 

      <FlatList
          inverted
          data={cat}  
          renderItem={({item})=>(
      <View style={styles.Form}>
        <View style={styles.second}> 
        <View style={{padding:10}}><Image style={{width:75,height:75,borderRadius:35}} source={{uri:item.image}}></Image></View>
            <View style={{paddingRight:15,paddingLeft:5,flexDirection:'row'}}>
    <Text style={{paddingRight:45}}>{item.name}</Text>
              <Entypo  name="edit" size={22}  color="black" onPress={toggleOverlay}/>
              <MaterialIcons name="delete" size={23} color="gray" style={{padding:15}} onPress={()=>delet(item.id)} style={{marginTop:5}}/>
            </View>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
          <Editcat id={item.id}/>
        </Overlay>

          </View>
        </View>
        )}/>
        </View>

    );}

const styles = StyleSheet.create({
  second:{
    flex:1,
    flexDirection:'row',
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
      marginBottom:10,
      width:'95%'
  }, 
  })