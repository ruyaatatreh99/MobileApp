import React,{useState,useEffect} from 'react';
import {ScrollView, Text,View,StyleSheet,FlatList,SafeAreaView,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import {  Divider } from 'react-native-elements';
import MyPurchasesComp from '../components/MyPurchasesComp';
import { AntDesign } from '@expo/vector-icons'; 
import style from '../style.js';
import AsyncStorage from '@react-native-community/async-storage';

export default function Mypurchases (){ 
 
  const [text,settext]=useState('');
  const [cartItem,setCartItem]=useState([])
  const[userid,setuserid]=useState(0);
  const [total, setTotal] = useState(0);

  const readuserid=async()=>{
     await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });
    await AsyncStorage.getItem('total').then((value) => {setTotal(eval(value)); });
  
    } 
   const shop=()=>{

    fetch('http://192.168.1.113/project/sendorder.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({      
        bid:userid,
      })
    }) 
    .then((response)=> response.json())
.then((responseJason)=>{
      if(responseJason === 'order sent')alert(responseJason); 
      if(responseJason === 'No order to send')alert(responseJason);
      else alert(responseJason);
       }).catch((error)=>{
       console.error(error);
      })
    }
    
      const deletep=(idd)=>{//on the todo
        setCartItem((prevwishes)=>{
          return prevwishes.filter(wish => wish.pid!=idd);
        })
        fetch('http://192.168.1.113/project/deletecart.php',{
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
        else{
          AsyncStorage.setItem('total',JSON.stringify(responseJason));
           }
      }).catch((error)=>{
        console.error(error);
        });
      }

      const readData =  () => {
        fetch('http://192.168.1.113/project/getcart.php',{
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
          if(responseJason === 'No Product in Shopping Cart')settext(responseJason);
          else {setCartItem(responseJason.results); 
          settext(' ');}
           }).catch((error)=>{
           console.error(error);
          })
        }
      
    useEffect(() => {
      readuserid()
      readData()
    })

  return (
 
    <View>

    <ScrollView >

    <View style={styles.container}>
      
    <View style={{flexDirection:'row',justifyContent:'center'}}>
    <Text style={style.Titles} >Shopping Cart</Text>
    <AntDesign name="shoppingcart" size={40} color="gray" />
    </View>

   <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,height:0.7}}/>
   <Text style={{fontSize:16,color:'#dc143c',marginLeft:20}}>{text}</Text>
   <View style={styles.purchases}>
   <FlatList
          data={cartItem}
          renderItem={({item})=>(
           <MyPurchasesComp item={item} deletion={deletep} bid={userid}/>
   
          ) } />
   </View>
  </View>
</ScrollView>


<View style={{alignItems:'center'}}>
<View style={styles.foot}>
        <View style={styles.total}>

        <View style={{padding:5,justifyContent:'space-around',flexDirection:'row'}}>
        <Text style={style.Title} >Total :</Text>
        <Text style={style.Title} >{total}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>shop()}>
        <Text>Check Out</Text>
        </TouchableOpacity>
        </View>
        </View>
</View>
</View>

  );  
} 

const styles = StyleSheet.create({
  container:{
    margin:20,
    marginTop:25,
    justifyContent:'center',
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

  purchases:{
    marginTop:5,
    marginBottom:150,
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
button: {
  alignItems: "center",
  backgroundColor: '#dc143c',
  padding: 10,
  margin:10,
  borderRadius:10,
  
},

total:{
   borderWidth:1,
   borderColor:'#dc143c',
   borderRadius:10,
   backgroundColor:'white',
   shadowColor: "#000",
   shadowOffset: {	width: 5,	height: 5,},
   shadowOpacity: 0.38,
   shadowRadius: 4.00,
   elevation: 54,
},

foot: {
    position: 'absolute',
    bottom:5,
    width: '96%',
  },
})