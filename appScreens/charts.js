import React,{useState, useEffect} from 'react';
import { Text, View,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../Global/calcstyle';
import Styles from '../style';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

    export default function Charts () {    
      const[state,setstate]=useState('');
   const[cost,setcost]=useState(0);
   const[userid,setuserid]=useState(0);
   const [profit,setprofit]=useState(0); 
   const [Reveniew,SetReveniew]=useState(0); 
   const [p,setp]=useState(0); 
   const [month,setmonth]=useState(1); 
   const monthNames = ["year","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
   const readuserid=async()=>{
    await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });
   } 
  const  readData =() => {
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
      setcost(responseJason.cost); 
      setprofit(responseJason.profit); 
      SetReveniew(eval(eval(profit)-eval(cost)));
      setp(eval(eval(profit)/eval(cost) *100));
     
       }).catch((error)=>{
       console.error(error);
      })
      }
      const  readReveniew  =() => {
       if(Reveniew<0)setstate('Lose')
       if(Reveniew>0)setstate('Winner')
       if(Reveniew==0)setstate('Capital returned')
       
          }
         
          const getdate=()=>{
            var date = new Date().getDate(); //Current Date
            setmonth(new Date().getMonth() + 1); //Current Month

            if(date===30 ||date===31 ||(date===28 && month===2) || (date===29&& month===2) ){
              fetch('http://192.168.1.113/project/updatecharts.php',{
                method:'POST',
                header:{
                    'Accept': 'application/json',
            'Content-type': 'application/json'
                },
                body: JSON.stringify({
                  userid:userid
                 })
            }) 
 
          
            }
          }
      useEffect(() => {
        readuserid()
        readData()
        readReveniew()
        getdate()
      })
 
    return (
        <ScrollView>
            <View style={styles.container}>

            <View style={{flexDirection:'row'}}>
    <Text style={Styles.Titles}>Monthly Estemates for {monthNames[month]}</Text>
                <MaterialCommunityIcons name="calendar-month" size={30} color="#dc143c" />
            </View>

                <View style={styles.Forms}>
                    <View style={{flexDirection:'row'}}>
                    <Text >expence of this month :  </Text>
                    <Text> {cost}  </Text>
                    </View>
                </View>

                <View style={styles.Forms}>
                    <View style={{flexDirection:'row'}}>
                    <Text >Profit of this month :   </Text>
                    <Text> {profit} </Text>
                    </View>
                </View>

                <View style={styles.Forms}>
                    <View style={{flexDirection:'row'}}>
                    <Text >Total Reveniew :   </Text>
    <Text> {Reveniew} </Text>
                    </View>
                    
                </View>
            
            
                <View style={styles.Forms}>
                    <View style={{flexDirection:'row'}}>
                    <Text >Status:  </Text>
    <Text> {state} </Text>
                    </View>
                    
                </View>

                <View style={styles.Forms}>
                    <View style={{flexDirection:'row'}}>
                    <Text >Percentage :  </Text>
    <Text> {p.toFixed(2)} % </Text>
                    </View>
                    
                </View>



            </View>
    </ScrollView>
          );
      }
    