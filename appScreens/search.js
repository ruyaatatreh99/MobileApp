import React, {useState, useEffect} from 'react';
import {SafeAreaView,Text,StyleSheet,View,FlatList,TextInput,Image,Button,ActivityIndicator,ScrollView} from 'react-native';
import { Overlay,Rating} from 'react-native-elements';
import ViewProduct from '../appScreens/ViewProduct';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import UserSearch from '../components/usersearch';
import ProductSearch from '../components/productSearch';
import style from '../style';

export default function Search ({navigation}) {

  const [flage,setflage]=useState(false);
  const[product,setproduct]=useState([]);
  const[user,setuser]=useState([]);
  const[text,settext]=useState('');

  const searchFilterFunction = () => {
    if(flage==true){
    fetch('http://192.168.1.113/project/search.php',{
    method:'post',
    header:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({     
      search:text,
      checked:''
    })
  }) 
  .then((response)=> response.json())
  .then((responseJason)=>{
    if(responseJason === 'no result')alert(responseJason);
    else {setproduct(responseJason.results); }
     }).catch((error)=>{
     console.error(error);
    })}

    if(flage==false){
      fetch('http://192.168.1.113/project/searchuser.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        search1:text
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason === 'no result')alert(responseJason);
      else {setuser(responseJason.results); }
       }).catch((error)=>{
       console.error(error);
      })}
  }
  const func1=()=>{
    setflage(false);
    searchFilterFunction ()

  }
  const func2=()=>{
    setflage(true)
    searchFilterFunction ()
  }
  return (
    <ScrollView>
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => settext(text)}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
          />
         
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5,}}>

     <TouchableOpacity onPress={()=>func1()} style={styles.bar}>
      <Text>user</Text>
     </TouchableOpacity>

     <TouchableOpacity onPress={()=>func2()} style={styles.bar}>
      <Text>product</Text>
     </TouchableOpacity>

</View>

      <View>
       <FlatList
          data={product}  
          renderItem={({item})=>(
            <SafeAreaView>
              <ProductSearch item={item}/>
         </SafeAreaView>
        )}/>

       <FlatList
          data={user}  
          renderItem={({item})=>(
            <SafeAreaView>
              <UserSearch item={item} navigation={navigation}/>
         </SafeAreaView>
        )}/>  
        </View>
    </SafeAreaView>
    <KeyboardSpacer/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  items :{
    padding:5,
    paddingLeft:10,
    margin:16,
    borderColor:'green',
    borderWidth:1,
    borderStyle :'dashed',
    flexDirection:'row'
},
  container: {
    backgroundColor: 'white',
    flexDirection:'row'
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 45,
    width:'98%',
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius:5,
    margin: 5,
    borderColor: '#dc143c',
    backgroundColor: '#FFFFFF',
  },
  around:{
    width:'100%',
      flexDirection:'row',
      justifyContent:'space-around',
      alignContent:'space-around',
    },
    Form:{
      borderRadius:10,
      backgroundColor:'white',
      borderColor:'#dc143c',
      borderWidth:1,
      shadowColor: "#000",
      shadowOffset: {	width: 0,	height: 0,},
      shadowOpacity: 0.48,
      shadowRadius: 5.00,
      marginTop:10,
      marginBottom:5,
      elevation: 15,
      width: '46%',
      height: 'auto',
      paddingTop:10,
    },
    bar:{
      backgroundColor:'lightgray',
      borderRadius:5,
      width:150,
      height:30,
      padding:5,
      justifyContent:'center',
      alignItems:'center'
    }
});