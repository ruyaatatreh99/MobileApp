import 'react-native-gesture-handler'
import React,{useState} from 'react';
import { StyleSheet, Text, View ,ScrollView,Button,Image, ImageEditor} from 'react-native';
import { Overlay,Rating,BottomSheet,ListItem} from 'react-native-elements';
import ViewProduct from '../appScreens/ViewProduct';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default function ProductPost ({product, onClick}) {  
    const [visible, setVisible] = useState(false);
    const [visibles, setVisibles] = useState(false);
    const[stat,setstat]=useState('')

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

    const editstate=(id,stat) => {
      fetch('http://192.168.1.113/project/editstate.php',{
       method:'POST',
       header:{
           'Accept': 'application/json',
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({     
         state:stat,
         id:id,
        })
   }) 
   .then((response)=> response.json())
   .then((responseJason)=>{
        if(responseJason === 'Information edited Successfully')alert(responseJason);
        else if(responseJason === 'unable to edit info')alert(responseJason);
       })
       //error
       .catch((error)=>{
           console.error(error);
       })
   }



    const toggleBottomNavigationView = () => { setVisibles(!visibles); };
    const list = [
      { title: 'out of stock', onPress: () =>  {setstat(0), editstate(product.id,0),console.log(stat)} },
      { title: 'available' , onPress: () =>{setstat(1), editstate(product.id,1),console.log(stat)}},
      { title: 'Cancel', containerStyle: { backgroundColor: 'lightgray' }, titleStyle: { color: 'white' },
        onPress: () => setVisibles(false),
      },
    ];


  return(
   <ScrollView >
     <View  style={{width:180, height: 'auto',marginLeft:10,position:'relative' ,flexDirection:'row'}}>
      <View style={styles.around}>
        <View style={styles.Form}>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <View style={{alignItems:'center'}}><Text >{product.name} </Text></View>
          <Entypo  name="edit" size={22} style={{}} color="black" onPress={()=>toggleBottomNavigationView()}/>
          </View>
          <BottomSheet isVisible={visibles} >
          {list.map((l, i) => (
    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
      <ListItem.Content>
        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ))}
          </BottomSheet>
            <View style={{marginLeft:10}}>
              <Image style={{width:170,height:80}} source={{uri:product.image}}></Image>
              <Rating  style={{ paddingVertical: 10 }} imageSize={30}  fractions={1} startingValue={eval(product.rate)} onFinishRating={rating => saverate(rating,product.id)}/>
              </View>

              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Button color='#dc143c' title='View' onPress={toggleOverlay} />
                <MaterialIcons name="delete" size={23} color="gray" onPress={()=>onClick(product.id)} style={{marginTop:5}}/>
              </View>

             </View>
           </View>
         </View>

         
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <ViewProduct  ProductName={product.name} Discribtion={product.bio} Priceproduct={product.price} image={product.image} pid={product.id} state={product.state}/>
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