import React,{useState} from 'react';
import { Text,View,TextInput,StyleSheet,Image,Button} from 'react-native';
import { Avatar,Icon,Overlay } from 'react-native-elements'; 
import { Foundation } from '@expo/vector-icons';
import ViewProductwish from '../appScreens/ViewProductwish';
import style from '../style.js';

import { connect } from 'react-redux';

export default function WishListComp ({item,deletion}){ 
  const [visible, setVisible] = useState(false);
  const toggleOverlay=async () =>{
    setVisible(!visible);
  }
  

    return (
<View style={styles.Form}>

<View style={style.second}> 

    <View >
      <Image style={{width:100,height:100}} source={{uri:item.image}}></Image>
    </View>

    <View style={{flexDirection:'column',justifyContent:'space-between'}}>
    <Text style={{marginTop:15}}>{item.bio}</Text>
    <Button color='#dc143c' title='View' onPress={toggleOverlay} />
    </View>
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


 <Icon style={{marginTop:10,marginLeft:10}}name='delete' color='gray' size={25} onPress={()=>deletion(item.pid)}/>
 <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <ViewProductwish ProductName={item.name} Discribtion={item.bio} Priceproduct={item.price} image={item.image} pid={item.pid} />
      </Overlay>

 </View>

 </View>

</View>
    );
}

const styles = StyleSheet.create({  
    itemsno:{
      width:'auto',
      flexDirection:'row',
      marginTop:5,
      justifyContent:'center'
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