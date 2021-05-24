import 'react-native-gesture-handler'
import React,{useState,useEffect,componentDidMount} from 'react';
import {View,ScrollView,Text,FlatList,Image,SafeAreaView,Keyboard} from 'react-native';
import {  Divider,Overlay,Icon } from 'react-native-elements';
import AddProduct from './AddProduct';
import ProductPost from '../components/ProductPost';
import AsyncStorage from '@react-native-community/async-storage';
import { Foundation } from '@expo/vector-icons';
export default function Profile () {  

  const [UserName,SetUserName]=useState(' ');
  const [Bio,SetBio]=useState(' ');
  const [text,settext]=useState(' ');
  const [Contacts,SetContacts]=useState(' '); 
  const [Address,SetAddress]=useState(' '); 
  const [image,Setimage]=useState(' '); 
  const [userid,Setuserid]=useState(0); 
  const [like,Setlike]=useState(0); 
  const [dislike,Setdislike]=useState(0); 
  const [visible, setVisible] = useState(false);
  const[product,setproduct]=useState([]);
console.disableYellowBox=true;

  const readData = async () => {
    try {
   
     const idd = await AsyncStorage.getItem('userid');
     if (idd !== 0) {
      Setuserid(eval(idd))
    }
  fetch('http://192.168.1.113/project/getpost.php',{
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
    if(responseJason === 'No Posts Yet')settext(responseJason);
    else {setproduct(responseJason.results);settext(''); }
     }).catch((error)=>{
     console.error(error);
    })
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  const getlike = ()=>{

    fetch('http://192.168.1.113/project/getlike.php',{
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
  SetUserName(responseJason.name);
  SetBio(responseJason.bio);
  SetContacts(responseJason.phonenumber);
  SetAddress(responseJason.address);
  Setimage(responseJason.image);
       }).catch((error)=>{
       console.error(error);
      })}
  
 
  useEffect(() => {
    readData(); 
    getlike()
  })

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const deletep=(id)=>{//on the todo
    setproduct((prevp)=>{
      return prevp.filter(product => product.id!=id);
    })
    fetch('http://192.168.1.113/project/deletep.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        id:id,  
        userid:userid , 
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

  return (  
      <ScrollView>  
        <View style={{flexDirection:'row',flex:1,padding:10}}>

          <View style={{marginTop:30}} >
             <Image style={{width:80,height:80,borderRadius:37}} source={{uri:image}}></Image>
         </View>

        <View style={{flexDirection:'column',flex:1,padding:10}}>
          <Text style={{padding:6,fontSize:15}}> {UserName} </Text>
          <Text style={{padding:6,fontSize:15}}> {Bio} </Text>
          <Text style={{padding:6,fontSize:15}}> {Contacts} </Text>
          <Text style={{padding:6,fontSize:15}}> {Address} </Text>
          <View    style={{flexDirection:'row',flex:1,padding:10}} >
          <Foundation name='like' color='#dc143c' size={35}  />
          <Text style={{padding:10,fontSize:15}}> {like} </Text>

          <Foundation name='dislike' color='#dc143c' size={35}  />
          <Text style={{padding:10,fontSize:15}}> {dislike} </Text>
          </View>
        </View>

        <Icon name='add' color='#dc143c' size={35}  onPress={toggleOverlay} />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
          <AddProduct/>
        </Overlay>

        </View>

       <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,height:1}}/>
       <Text style={{fontSize:20,color:'#dc143c',marginLeft:20}}>{text}</Text>
       <SafeAreaView style={{flex:1,justifyContent:'center'}}>
       <FlatList
          inverted
          data={product}  
          renderItem={({item})=>(
            <View style={{flex:1,flexDirection:'column',margin:1}} >
              <ProductPost product={item} onClick={deletep}/>
            </View>
            
        )}
        numColumns={2}
        keyExtractor={(item, id) => id}/>

        </SafeAreaView>
      </ScrollView>
    );   
}