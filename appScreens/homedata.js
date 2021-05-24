import 'react-native-gesture-handler'
import React,{useState,useEffect} from 'react';
import {View,ScrollView,Text,StyleSheet,FlatList,SafeAreaView,Button} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Divider } from 'react-native-elements';
import ProductPostDemo from '../components/ProductPostDemo';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
import Homenav from '../navigators/Homenav';

export default function HomeData({route,navigation})  {   
  const { type } = route.params;
  const [product,setproduct]=useState([]);
  const [text,settext]=useState(' ');
  const [checked, setChecked] = useState('rate');
  const readData =()=>{
    fetch('http://192.168.1.113/project/search.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        search:type,
        checked:checked,
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason === 'No Result!')settext(responseJason);
      else {setproduct(responseJason.results); settext(' ')}
       }).catch((error)=>{
       console.error(error);
      })}
  
      useEffect(() => {
        readData(); 
      })

      const goback=()=>{
        console.log('dldd')
        navigation.pop()   
      }
      
      console.disableYellowBox=true;
    return (  
      <ScrollView>  
    
       <Button  title='Home' onPress={()=>goback()} />


          <View style={{padding:5,alignContent:'center',paddingTop:10}}>
              <Text style={styles.Titles}>{type} </Text>
              <View style={{flexDirection:'row'}}>
      <RadioButton
      uncheckedColor
      color='#dc143c'
        value="rate"
        status={ checked === 'rate' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('rate')}
      />
     <Text style={{margin:7}} >Rating </Text>
      <RadioButton
      uncheckedColor
      color='#dc143c'
        value="Lowprice"
        status={ checked === 'Lowprice' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Lowprice')}
      />
      <Text style={{margin:7}} > Low price </Text>
      <RadioButton
      uncheckedColor
      color='#dc143c'
        value="Highprice"
        status={ checked === 'Highprice' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Highprice')}
      />
      <Text style={{margin:7}} > High price </Text>
    </View>
              <Divider style={{backgroundColor:'#dc143c',margin:10,marginTop:20}}/>
              <Text style={{fontSize:16,color:'#dc143c',marginLeft:20}}>{text}</Text>
              <SafeAreaView style={{flex:1,justifyContent:'center'}}>
       {/*<ProductPostDemo />*/}
      <FlatList
          inverted
          data={product}  
          // keyExtractor={product.id}
          renderItem={({item})=>(
            <View style={{flex:1,flexDirection:'column',margin:1}} >
              <ProductPostDemo product={item} navigation={navigation}/>
            </View>
          )}  
         numColumns={2}
          keyExtractor={(item, id) => id}/>

        </SafeAreaView>
       </View>
       <KeyboardSpacer/>
      </ScrollView>
    );   
  }

const styles = StyleSheet.create({
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