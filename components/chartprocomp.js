import React,{useState, useEffect} from 'react';
import { Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../Global/calcstyle';
import Styles from '../style';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import CalcStyle from '../Global/calcstyle';

    export default function Charts () {    
        const[product,setproduct]=useState([]);
   const[cost,setcost]=useState(0);

  const  readData = async () => {
        try {
          const gExpences = await AsyncStorage.getItem('cost');
   
          if (gExpences !== 0) {
            setcost(eval(gExpences));
          }
        
        } catch (e) {
          alert('Failed to fetch the data from storage')
        }
      }
      useEffect(() => {
        readData()
      }, [])

      const calc=(price,number)=>{
          let v=1;
          v=price*number;
      }

  
    return (
        <View >
            <View style={styles.container}>
            <FlatList
            data={product}  
            renderItem={({item})=>(
            calc(item.price,item.sold),
            <View style={styles.Forms}>
            <View style={{flexDirection:'row'}}>
            <Text >{item.name} </Text>
            <Text>{item.price }</Text>
            <Text>{v }</Text>
            </View>
        </View>
            
        )}/>

           </View>
        </View>
          );
      }