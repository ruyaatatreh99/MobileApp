import 'react-native-gesture-handler'
import React,{useState} from 'react';
import { StyleSheet, Text, View ,ScrollView,Button,Image} from 'react-native';
import { Overlay,Rating} from 'react-native-elements';
import ViewProduct from '../appScreens/ViewProduct';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function homePostDemo ({product}) {  
    const [visible, setVisible] = useState(false);
    const toggleOverlay=async () =>{
      setVisible(!visible);
    }

 const saverate=(rating,id) => {
       fetch('http://192.168.1.107/project/rating.php',{
        method:'POST',
        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({     
          rating:rating,
          id:id,
         })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
         if(responseJason === 'Try Again')alert(responseJason);
        })
        //error
        .catch((error)=>{
            console.error(error);
        })
    }

  return(
   <ScrollView >
     <View  style={{width:180, height: 'auto',marginLeft:10,position:'relative' ,flexDirection:'row'}}>
      <View style={styles.around}>
        <View style={styles.Form}>
          <View style={{alignItems:'center'}}><Text >{product.name} </Text></View>
            <View style={{marginLeft:10}}>
              <Image style={{width:170,height:80}} source={{uri:product.image}}></Image>
              <Rating  style={{ paddingVertical: 10 }} imageSize={30}  fractions={1} startingValue={eval(product.rate)} onFinishRating={rating => saverate(rating,product.id)}/>
              </View>

              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Button color='#dc143c' title='View' onPress={toggleOverlay} />
              </View>

             </View>
           </View>
         </View>

         
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <ViewProduct  ProductName={product.name} Discribtion={product.bio} Priceproduct={product.price} image={product.image} pid={product.id} state={product.state} />
  </Overlay>
  </ScrollView>
    );
}

const styles = StyleSheet.create({

around:{
    flexDirection:'row',
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
    width:190,
    height: 'auto',
    paddingTop:10,
  },

})