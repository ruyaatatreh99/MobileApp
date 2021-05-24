import React,{useState,useEffect} from 'react';
import { StyleSheet, View,Text, FlatList,Alert,TouchableWithoutFeedback,Keyboard,TouchableOpacity,ViewPropTypes} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Header from '../components/NoteHeader';
import NoteAdd from '../components/NoteAdd';
import AsyncStorage from '@react-native-community/async-storage';
//import CheckBox from '@react-native-community/checkbox';
//import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';  
import { CheckBox } from 'react-native-elements'
export default function Notes({navigation}) {
  let t=0;
  const [todolist,settodolist]=useState([]);
  const [userid,Setuserid]=useState(0); 
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
 

  const pressHandler=(id)=>{//on the todo
    settodolist((prevTodos)=>{
      return prevTodos.filter(todolist => todolist.noteid!=id);
    })
    fetch('http://192.168.1.113/project/deletenote.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        noteid:id,
        userid:userid,
       })
  }) 
  //responce
  .then((response)=> response.json())
  //alarm msg
  .then((responseJason)=>{
    if(responseJason === 'Note Deleted')alert(responseJason);
    if(responseJason === 'Try Again')alert(responseJason);

  }).catch((error)=>{
    console.error(error);
});
  }

  const [keys,setkeys]=useState(1);

  const submitHandler=(text)=>{//on the butotn 
    if(text.length>3 ){
      t=keys+1;
      setkeys(t);
      settodolist((prevTodos)=>{
        return [
          {text:text, key:keys},
          ...prevTodos //spreading the prev to do adds the new ones 
        ]
      })
      fetch('http://192.168.1.113/project/todolist.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        text:text,
        noteid:keys,
        userid:userid,
        color:'false',
       })
  }) 
  //responce
  .then((response)=> response.json())
  //alarm msg
  .then((responseJason)=>{

    if(responseJason === 'Try Again')alert(responseJason);

  }).catch((error)=>{
    console.error(error);
});
    }
    else{
      Alert.alert('opps!','more than 3 char ',[{text:'understood'}])
    }   
  }
  const updatevalue=(text,key)=>{//on the butotn 
    
      fetch('http://192.168.1.113/project/updatecolor.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        text:text,
        noteid:key,
        userid:userid,
       })
  }) 
  //responce
  .then((response)=> response.json())
  //alarm msg
  .then((responseJason)=>{

    if(responseJason === 'Try Again')alert(responseJason);

  }).catch((error)=>{
    console.error(error);
});
    
  }
const readData = async () => {
  try {
    const id = await AsyncStorage.getItem('userid');     
    if (id !== 0) {
      Setuserid(eval(id))
    }
    
fetch('http://192.168.1.113/project/getnote.php',{
  method:'post',
  header:{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({     
    userid:userid
})
}) 
.then((response)=> response.json())
.then((responseJason)=>{
  if(responseJason === 'no pos')alert(responseJason);
  else {settodolist(responseJason.results); }
  }).catch((error)=>{
  console.error(error);
  })   
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  useEffect(() => {
    readData()
  })




  return (
   
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
     }}>
    <View style={styles.container}>
      {/*header*/}
    <Header nav={navigation}/>
    <View style={styles.content}>
        {/*to do form*/}
      < NoteAdd submitHandler={submitHandler}/> 

        <View style={styles.list}>

          <FlatList
            data={todolist}
            //keyExtractor={todolist.id}
            renderItem={({item})=>(
              
              <View style={styles.items}>
            <TouchableOpacity  style={{borderRadius:10,height:'100%',width:'100%'}} >
              <View style={{flexDirection:'row'}}>

              <View style={{flexDirection:'row', justifyContent:'space-around',alignContent:'space-between'}}>
        
             {/* <CheckBox disabled={false}
               value={eval(item.color)} 
               onCheckColor={'#dc143c'}
            onValueChange={(newValue) => {setToggleCheckBox(newValue),updatevalue(eval(newValue),item.noteid)}} />*/}
            <CheckBox
  checked={eval(item.color)} 
  onPress={() =>{updatevalue(!eval(item.color),item.noteid)}}
  checkedColor={'#dc143c'}
  uncheckedColor={'#dc143c'}
/>
      
                <MaterialIcons name='delete'  size={24} color='#333' onPress={()=> pressHandler(item.noteid)} style={{marginLeft:240,position:'absolute'}}/>
                <Text style={styles.itemText} >{item.text}</Text>
                </View>
              
                </View>
               
           </TouchableOpacity>
           </View>   
          )} />

        </View>
      </View>
    </View>
          </TouchableWithoutFeedback> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    flex: 1,
    padding:40,
  },
  list:{
    flex: 1,
    marginTop:20,
  },
  items :{
    padding:16,
    marginTop:16,
    borderColor:'green',
    borderWidth:1,
    borderStyle :'dashed',
    borderRadius:10,
    flexDirection:'row'
},
checkbox: {
    alignSelf: 'flex-end',
  },
itemText:{
    marginLeft:10,
    fontSize:20,

}
});
