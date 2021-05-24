import React,{useState} from 'react';
import { StyleSheet, View ,Button,} from 'react-native';


export default function TextInputCalc({onClick,cal}) {
    
  
    /*const cal=()=>{//calclation when calculate is pressed 
      setTotal(text1 * text2);
    }*/
 
    return(
        <View>
            <View style={styles.button}>
                <Button color='#dd4e4e' title='Calculate' onPress={()=> cal()}></Button>
                <Button color='#dd4e4e' title='Add Row' onPress={()=>onClick()} ></Button>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
 });
