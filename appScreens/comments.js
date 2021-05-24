import 'react-native-gesture-handler'
import React,{ useState,useEffect} from 'react';
import {View,ScrollView,Text,StyleSheet,Button,FlatList,Alert} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Avatar, Divider,Overlay,Icon } from 'react-native-elements';
import Styles from '../style';
import { TextInput } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons'; 
import CommentComp from '../components/commentcomp';
import AddComment from '../components/addcomment';
import AsyncStorage from '@react-native-community/async-storage';

export default function Comments({navigation}) {

  const goback=()=>{
    console.log('dldd')
    navigation.pop()   
  }

    const [comments,setcomments]=useState([]);

    const[userid,setuserid]=useState(0);
    const[name,setname]=useState('');
    const[image,setimage]=useState('');

    const readuserid=async()=>{ await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });} 
    const readname=async()=>{ await AsyncStorage.getItem('name').then((value) => {setname(value); });} 
    const readimage=async()=>{ await AsyncStorage.getItem('image').then((value) => {setimage(value); });} 
    const readData = async () => {
        try {
      fetch('http://192.168.1.113/project/getcomment.php',{
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
        if(responseJason === 'no pos')alert(responseJason);
        else {setcomments(responseJason.results); }
        }).catch((error)=>{
        console.error(error);
        })   
          } catch (e) {
            alert('Failed to fetch the data from storage')
          }
        }
      
    useEffect(() => {
      readuserid()
      readname()
      readimage()
      readData()
    }, [])

    const post=(text)=>{//on the butotn 
        if(text.length>3 ){
            setcomments((prevcomm)=>{
            return [
              {text:text},
              ...prevcomm //spreading the prev to do adds the new ones 
            ]
          })
          fetch('http://192.168.1.107/project/addcomment.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({     
            text:text,
            userid:userid,
            name:eval(name),
            image:eval(image)
           })
      }) 
      //responce
      .then((response)=> response.json())
      //alarm msg
      .then((responseJason)=>{
        if(responseJason === 'Try Again')alert(responseJason);
    
      }).catch((error)=>{
        console.error(error);
    });
        }
        else{
          Alert.alert('opps!','more than 3 char ',[{text:'understood'}])
        }   
      }


    
    return (
        <ScrollView>  
<Button  title='Guide' onPress={()=>goback()} />
          <AddComment post={post}/>

     <View  >
       {/* <CommentComp />*/}
       <FlatList
          data={comments}  
          // keyExtractor={comments.text}
          renderItem={({item})=>(
            <View  >
              <CommentComp  image={item.image} name={item.name} comment={item.comment} id={item.id}/>
            </View>
          )}/>

        </View>
     <KeyboardSpacer/>
    </ScrollView>
          );
      }

      const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor:'lightgray',
            borderRadius:20,
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 4.00,
            elevation: 4,
        },
        input:{
            textAlign:'center',
            borderWidth:1,
            padding:15,
            borderRadius:15,
            marginBottom:10,
            borderColor:'red',
            borderBottomColor:'black',
            width:250,
        },
        Title:{  
            textAlign:'center',
            fontSize:15,
            paddingBottom:5,
        },
        Titles:{
            textAlign:'center',
            fontSize:30,
            fontWeight:'bold',
            paddingBottom:30,
            color:'#dc143c',//crimson
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 5,},
            shadowOpacity: 0.28,
            shadowRadius: 4.00,
            elevation: 4,
        },
      });