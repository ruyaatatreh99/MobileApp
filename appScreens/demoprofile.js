import 'react-native-gesture-handler'
import React,{useState,useEffect,componentDidMount} from 'react';
import {View,ScrollView,Text,FlatList,Image,SafeAreaView,Button} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements';
import AddProduct from './AddProduct';
import HomepostDemo from '../components/homepostdemo';
import AsyncStorage from '@react-native-community/async-storage';
import { Foundation } from '@expo/vector-icons';
import demopronav from '../navigators/demopronav';

export default function demoProfile ({route,navigation}) {   
  
  const { name } = route.params;
  const { bio} = route.params;
  const { image } = route.params;
  const { email } = route.params;
  const { id } = route.params;
  const userid=eval(id)
  const [product,setproduct]=useState([]);
  const [like,Setlike]=useState(0); 
  const [dislike,Setdislike]=useState(0); 
  
  const countlike=(no)=>{
    Setlike(no);
    fetch('http://192.168.1.107/project/setlike.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        userid:userid,
        like:eval(like)+1
       })
  }) 
  }
  const countdislike=(no)=>{
    Setdislike(no);
    fetch('http://192.168.1.107/project/setlike.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
   userid:userid,
   dislike:eval(dislike)+1
       })
  }) 
   
  }
  const goback=()=>{
    console.log('dldd')
    navigation.pop()   
  }
 
const readData = ()=>{

  fetch('http://192.168.1.107/project/getpost.php',{
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
    else {setproduct(responseJason.results); }
     }).catch((error)=>{
     console.error(error);
    })}
    const getlike = ()=>{

      fetch('http://192.168.1.107/project/getlike.php',{
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
Setlike(responseJason.likeuser); 
Setdislike(responseJason.dislike); 

         }).catch((error)=>{
         console.error(error);
        })}
    
    useEffect(() => {
      getlike()
    },[])
    useEffect(() => {
      readData(); 
    })

   
  return (  
      <ScrollView>  
        <Button  title='goback' onPress={()=>goback()} />
        <View style={{flexDirection:'row',flex:1,padding:10}}>

          <View style={{marginTop:30}} >
           <Image style={{width:80,height:80,borderRadius:40}} source={{uri:image}}></Image>
         </View>

        <View style={{flexDirection:'column',flex:1,padding:10}}>
          <Text style={{padding:6,fontSize:15}}> {name} </Text>
          <Text style={{padding:6,fontSize:15}}> {bio}</Text>
          <Text style={{padding:6,fontSize:15}}> {email} </Text>
          <View    style={{flexDirection:'row',flex:1,padding:10}} >
          <Foundation name='like' color='#dc143c' size={35}  onPress={()=>countlike(eval(like)+1)} />
          <Text style={{padding:10,fontSize:15}}> {like} </Text>

          <Foundation name='dislike' color='#dc143c' size={35}  onPress={()=>countdislike(eval(dislike)+1)} />
          <Text style={{padding:10,fontSize:15}}> {dislike} </Text>
          </View>
        </View>


        </View>

       <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,height:1}}/>

       <SafeAreaView style={{flex:1,justifyContent:'center'}}>
       {/*<ProductPostDemo />*/}
      <FlatList
          inverted
          data={product}  
          // keyExtractor={product.id}
          renderItem={({item})=>(
            <View style={{flex:1,flexDirection:'column',margin:1}} >
              <HomepostDemo product={item} />
            </View>
          )}
          numColumns={2}
          keyExtractor={(item,sid) => sid}/>

        </SafeAreaView>
      </ScrollView>
    );   
}