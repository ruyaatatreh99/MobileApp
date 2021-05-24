import React,{useState} from 'react';
import { StyleSheet,View,Button,TextInput} from 'react-native';


export default function NoteAdd({submitHandler}){
    const [text,setText]=useState('');//to keep track of user input

    const ChangeHandler =(val)=>{ //when fire takes the value puts it in val 
       setText(val);
    } 

    return(
        <View >
            <TextInput 
            style={styles.input}
            placeholder='new Note ...'
            onChangeText={ChangeHandler} 
            />
            <Button onPress={()=> submitHandler(text)} title='add Note' color='#dc143c'/>
            
        </View>
    )}

const styles = StyleSheet.create({
    input:{
       
        textAlign:'center',
        fontSize:20,
        paddingBottom:15,
        marginBottom:10,
        
    }
})