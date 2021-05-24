import React,{useState,useEffect} from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, Text, View ,TextInput,FlatList,ScrollView,TouchableOpacity,Button,ActivityIndicator} from 'react-native';
import { List, ListItem } from "react-native-elements";
import RowName from '../components/RowName';
import ButtonsCalc from '../components/ButtonsCalc';
import {Icon } from 'react-native-elements';
import styles from '../Global/calcstyle';
import AsyncStorage from '@react-native-community/async-storage';
export default function Claculate({navigation}) {
  const[userid,setuserid]=useState(0);
  const goback=()=>{
    console.log('dldd')
    navigation.pop()   
  }
  const readuserid=async()=>{
    await AsyncStorage.getItem('userid').then((value) => {setuserid(eval(value)); });

   } 
   useEffect(() => {
    readuserid()
  })
  let count=0;
  let count2=0;
  let tott=0;
  let totm=0;
  let tote=0;
  let procost=0;
  let c=0;
  let cc=0;

  const[showT,setshowT]=useState(0);
  const[showm,setshowm]=useState(0);
  const[showe,setshowe]=useState(0);

  const [rowTools,setrowTools]=useState([{total:'',key1:'',price:'',quantity:'',name:''}]);
  const [rowMaterial,setrowMaterial]=useState([{total:'',key2:''}]);
  const [rowEmployees,setrowEmployees]=useState([{total:'',key3:''}]);

  const[keys1,inckey1]=useState(1);
  const[keys2,inckey2]=useState(1);
  const[keys3,inckey3]=useState(1);

  const [text1, setText1] = React.useState(text1);//keep tarck of user input 
  const [text2, setText2] = React.useState(text2);//keep tarck of user input 
  const [text1m, setText1m] = React.useState(text1m);//keep tarck of user input 
  const [text2m, setText2m] = React.useState(text2m);//keep tarck of user input 
  const [text1e, setText1e] = React.useState(text1e);//keep tarck of user input 
  const [text2e, setText2e] = React.useState(text2e);//keep tarck of user input 
  
  const [total,setTotal]=useState(0)
  const [NumItem, onChangeNumItem] = React.useState(NumItem);
  const [profit, onChangeprofit] = React.useState(profit);

  const [totalTools,setTotalTools]=useState('0');
  const [totalMaterial,setTotalMaterial]=useState('0');
  const [totalemployee,setTotalEmployee]=useState('0');
  const[enrgycost,setenergycost]=useState(enrgycost);
  const[transcost,settranscost]=useState(transcost);

  const [productioncosts,setproductioncost]=useState('0');
  const addrowclicked1=(text1,text2,price)=>{//on the buttotn 
    inckey1(keys1+1);
        setrowTools((prevrows)=>{//to update state
          return [//so we can use the old rows
            {text1:text1,text2:text2,price:price, key1:keys1.toString()},//use another random generater 
            ...prevrows //spreading the prev to do adds the new ones 
          ]
        })
  }

  const addrowclicked2=(text1m,text2m,price)=>{//on the buttotn 
    inckey2(keys2+1);
        setrowMaterial((prevrows)=>{//to update state
          return [//so we can use the old rows
            {text1:text1m,text2:text2m,price:price, key2:keys2.toString()},//use another random generater 
            ...prevrows //spreading the prev to do adds the new ones 
          ]
        })
  }

  const addrowclicked3=(text1e,text2e,price)=>{//on the buttotn 
    inckey3(keys3+1);
        setrowEmployees((prevrows)=>{//to update state
          return [//so we can use the old rows
            {text1:text1e,text2:text2e,price:price, key3:keys3.toString()},//use another random generater 
            ...prevrows //spreading the prev to do adds the new ones 
          ]
        })
  }
  
  const price=()=>{
    count=eval(totalMaterial)/eval(NumItem);
    count2= eval(count)+ eval(profit);
    setTotal(count2);
  }
  const calcTools =(text1)=>{
    setText1(text1);
    tott=eval(text1)*eval(text2) + eval(tott)
   setTotalTools(tott)
  }
 
     const calcMaterial=(text1m)=>{
      setText1m(text1m);
      totm=eval(text1m)*eval(text2m)+ eval(totm);
      setTotalMaterial(totm);
      c=eval(totalemployee)+eval(totm);
  
      fetch('http://192.168.1.107/project/addcost.php',{
            method:'POST',
            header:{
                'Accept': 'application/json',
        'Content-type': 'application/json'
            },
            body: JSON.stringify({
              cost:c,
              userid:userid
             })
        }) 
        //responce
        .then((response)=> response.json())
        //alarm msg
        .then((responseJason)=>{
            if(responseJason === 'sav')alert(responseJason);
        
           
      
        }).catch((error)=>{
            console.error(error);
        });
      

    }

    const calcemployee=(text1e)=>{
      setText1e(text1e);
      tote=eval(text1e)*eval(text2e) +eval(tote)
      setTotalEmployee(tote)
      cc=eval(tote)+eval(totalMaterial);
  
      fetch('http://192.168.1.107/project/addcost.php',{
            method:'POST',
            header:{
                'Accept': 'application/json',
        'Content-type': 'application/json'
            },
            body: JSON.stringify({
              cost:cc,
              userid:userid
             })
        }) 
        //responce
        .then((response)=> response.json())
        //alarm msg
        .then((responseJason)=>{
            if(responseJason === 'sav')alert(responseJason);
        
           
      
        }).catch((error)=>{
            console.error(error);
        });
      
    }

    const productonCost=()=>{
      procost=eval(totalemployee)+eval(totalMaterial)+eval(totalTools)+eval(transcost)+eval(enrgycost);
      setproductioncost(procost);
      
    }

    const removetools=(key1)=>{//on the todo
    setrowTools((prevrow)=>{
      return prevrow.filter(rowTools => rowTools.key1!=key1);
    })
    }

    const removematerial=(key2)=>{//on the todo
    setrowMaterial((prevrow)=>{
      return prevrow.filter(rowMaterial => rowMaterial.key2!=key2);
    })
    }

    const removeemployee=(key3)=>{//on the todo
    setrowEmployees((prevrow)=>{
      return prevrow.filter(rowEmployees => rowEmployees.key3!=key3);
    })
    }

    const calct=(v)=>{
      return(
      tott=eval(v)
      );
    }
    const calcm=(v)=>{
      return(
      totm=eval(v)

      );
    }
    const calce=(v)=>{
      return(
      tote=eval(v)

      );
    }
  
    return (
        <ScrollView >
          <Button  title='Guide' onPress={()=>goback()} />
            <View style={styles.container}>
            <View style={styles.Forms}>
                    <RowName Title={'Tools For Production'} first={'Tool Name'} second={'Price'} third={'Quantity'}/>
                    <FlatList 
                       data={rowTools}  
                       keyExtractor={(item) => item.key1}
                       renderItem={({item})=>(  
                         item.total=totalTools,
                         calct(item.total),
                        <View >
                        <TouchableOpacity style={styles.row} >
                        <TextInput style={styles.input} placeholder='tool' />
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='price'    onChangeText={text2=>setText2(text2)}/>
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='quantity' onChangeText={text1=>calcTools(text1)}/>
                        <Icon name='delete' color='#dc143c' size={25}  onPress={()=>removetools(item.key1)} />  
                        </TouchableOpacity>
                        </View>
                    ) } 
                  />
                    <ButtonsCalc  onClick={()=>addrowclicked1()} cal={()=>setshowT(totalTools)}  />
                   <Text style={{marginLeft:20}}>Total:  {showT}</Text>
                </View>

                <View style={styles.Forms}>
                    <RowName Title={'Row Materials'} first={'Material'} second={'Price'} third={'Quantity'}/>
                    <FlatList 
                       data={rowMaterial}
                       keyExtractor={(item) => item.key2}  
                       renderItem={({item})=>(
                        item.total=totalMaterial,
                        calcm(item.total),
                        <View >
                        <TouchableOpacity style={styles.row} >
                        <TextInput style={styles.input} placeholder='material' />
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='price'    onChangeText={text2m=>setText2m(text2m)}/>
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='quantity' onChangeText={text1m=>calcMaterial(text1m)}/>
                        <Icon name='delete' color='#dc143c' size={25}  onPress={()=>removematerial(item.key2)} />  
                        </TouchableOpacity>
                        </View>
                    ) } />
                    <ButtonsCalc  onClick={()=>addrowclicked2()} cal={()=>setshowm(totalMaterial)}/>
                    <Text style={{marginLeft:20}}>Total:  {showm}</Text>
                </View>
               
                <View style={styles.Forms}>
                    <RowName Title={'Employment'} first={'Job Title'} second={'Salary'} third={'Number'}/>
                    <FlatList
                     data={rowEmployees}  
                     keyExtractor={(item) => item.key3}
                       renderItem={({item})=>(
                        item.total=totalemployee,
                        calce(item.total),
                        <View >
                        <TouchableOpacity style={styles.row} >
                        <TextInput style={styles.input} placeholder='job' />
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='salary' onChangeText={text2e=>setText2e(text2e)}/>
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='no' onChangeText={text1e=>calcemployee(text1e)}/>
                        <Icon name='delete' color='#dc143c' size={25}  onPress={()=>removeemployee(item.key3)} />  
                        </TouchableOpacity>
                        </View>
                    ) } />
                    <ButtonsCalc onClick={()=>addrowclicked3()} cal={()=>setshowe(totalemployee)}/>
                    <Text style={{marginLeft:20}}>Total:  {showe}</Text>
                </View>

                <View style={styles.Forms}>
                    <RowName Title={'Other'}/>
                    <View style={styles.row}>
                       <Text>Energy (electrical, fuel)</Text>
                       <TextInput placeholder='Value' keyboardType='numeric' onChangeText={enrgycost=>setenergycost(enrgycost)}/>
                    </View>

                    <View style={styles.row}>
                       <Text>transportation</Text>
                       <TextInput placeholder='Value'keyboardType='numeric' onChangeText={transcost=>settranscost(transcost)}/>
                    </View>
                    <Text style={styles.row}>Total Cost:  {productioncosts}</Text>
                    <Button color='#dd4e4e' title='Calculate' onPress={()=> productonCost()} ></Button>
            </View>
            <View style={styles.Forms}>
                    <RowName Title={'Item price'}/>
                    <View style={styles.row}>
                       <Text>Row Materials cost</Text>
                       <Text>{totalMaterial}</Text>
                    </View>
                    <View style={styles.row}>
                       <Text>Number of items produced</Text>
                       <TextInput placeholder='Value' keyboardType='numeric' onChangeText={NumItem => onChangeNumItem(NumItem)}/>
                    </View>
                    <View style={styles.row}>
                       <Text>Profit</Text>
                       <TextInput placeholder='Value' keyboardType='numeric' onChangeText={profit => onChangeprofit(profit)}/>
                    </View>
                    <View style={styles.row}>
                    <Button color='#dd4e4e' title='Calculate' onPress={()=>price()} ></Button>
                       <Text style={{marginTop:10}}>{total}</Text>
                    </View>
            </View>

            </View>
            <KeyboardSpacer/>
    </ScrollView>
          );
      }