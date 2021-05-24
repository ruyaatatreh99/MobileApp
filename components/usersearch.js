import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import drawers from '../navigators/drawers';
import Searchnav from '../navigators/searchnav';

export default function UserSearch({item,navigation}){/* or todoItem(props){props.item}*/

const show =(item)=>{
    navigation.navigate('DemoPro',{name:item.name,
        bio:item.bio,
        image:item.image,
    email:item.email,id:item.userid});
}
    return(
        
        <TouchableOpacity onPress={()=>show(item)}>
            <View style={styles.items}>
            <Image style={{width:100,height:100,borderRadius:50}} source={{uri:item.image}}></Image>
            <View style={{padding:20}}>
            <Text>{item.name}</Text>
            <Text>{item.bio}</Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    items :{

        padding:5,
        paddingLeft:10,
        margin:16,
        borderColor:'green',
        borderWidth:1,
        borderStyle :'dashed',
        flexDirection:'row'
    },
    itemText:{
        marginLeft:10,
        fontSize:20,
    }

});