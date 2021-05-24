import React from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import style from '../style'

export default function Header({nav}){

    const goback=()=>{
        console.log('dldd')
        nav.pop()   
      }

    return(
        <View>
        <Button  title='Guide' onPress={()=>goback()} />
        <View style={styles.header}>   
            <Text style={style.Titles}>My Todos</Text>
            <FontAwesome name="sticky-note-o" size={26} color="#dc143c"  style={{paddingLeft:10,paddingTop:5}}/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:70,
        paddingTop:30,
        flexDirection:'row',
        justifyContent:'center'
    },

});