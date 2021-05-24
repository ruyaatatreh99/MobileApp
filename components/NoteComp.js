import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,CheckBox} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function NoteComp({item , pressHandler}){/* or todoItem(props){props.item}*/

const [isSelected, setSelection] = useState(false);
const [color,setcolor]=useState(false);

    if(color==false){
        return(
        
            <TouchableOpacity onPress={setcolor(true)}>
                <View style={styles.items}>
                <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox}/>
                    <MaterialIcons name='delete' size={24} color='#333'  onPress={ pressHandler(item.key,item.userid,item.text)}/>
                <Text style={styles.itemText}  >{item.text}</Text>
                </View>
                
            </TouchableOpacity>
        )
    }
    else{
        <TouchableOpacity onPress={setcolor(false)}>
        <View style={styles.items}>
        <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox}/>
            <MaterialIcons name='delete' size={24} color='#333'  onPress={ pressHandler(item.key,item.userid,item.text)}/>
        <Text style={styles.itemText}  >{item.text}</Text>
        </View>
        
    </TouchableOpacity>

    }



}

const styles = StyleSheet.create({
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
