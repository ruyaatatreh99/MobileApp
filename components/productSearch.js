import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image,Button} from 'react-native';
import drawers from '../navigators/drawers';
import Searchnav from '../navigators/searchnav';
import ViewProduct from '../appScreens/ViewProduct';
import { Overlay,Rating} from 'react-native-elements';

export default function ProductSearch({item}){/* or todoItem(props){props.item}*/

const [visible, setVisible] = useState(false);
const toggleOverlay=async () =>{
  setVisible(!visible);
}
const saverate=(rating,id) => {
    fetch('http://192.168.1.113/project/rating.php',{
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
        
<View>
          <View style={styles.items}>
             <Image style={{width:100,height:100}} source={{uri:item.image}}></Image>
             <View style={{padding:20}}>
            <View style={{alignItems:'center'}}><Text>{item.name}</Text></View>
              
              <Rating  style={{ paddingVertical: 10 }} imageSize={30}  fractions={1} startingValue={eval(item.rate)} onFinishRating={rating => saverate(rating,item.id)}/>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Button color='#dc143c' title='View' onPress={()=>toggleOverlay()} />
           </View>
         </View>

     
                 <Overlay isVisible={visible} onBackdropPress={()=>toggleOverlay()}>
                 <ViewProduct ProductName={item.name} Discribtion={item.bio} Priceproduct={item.price} image={item.image} pid={item.id} state={item.state}/>
              </Overlay>
              </View>
    )
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
    itemText:{
        marginLeft:10,
        fontSize:20,
    }

});