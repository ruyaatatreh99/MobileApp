import * as React from 'react';
import { Text,View,Button,StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';


export default function GuideComp ({title,sth,onclick,pic}) {    
    return (
        <View style={styles.Form}>
        <Card>
          <Card.Title>{title}</Card.Title>
          <Card.Divider/>
          <Card.Image source={pic} ></Card.Image>
          <Text style={{marginBottom: 10,marginTop:10}}>
                {sth}
         </Text>
         <Button color='#dc143c' title='Open' onPress={()=>onclick()} />
        </Card>
     </View>
    );}

    const styles = StyleSheet.create({
        Form:{     
            borderRadius:10,
            backgroundColor:'white',
            borderColor:'#dc143c',
            borderWidth:1,
            shadowColor: "#000",
            shadowOffset: {	width: 0,	height: 12,},
            shadowOpacity: 0.58,
            shadowRadius: 10.00,
            marginTop:10,
            marginBottom:10,
            elevation: 24,
            width: '48%',
             height: 'auto',         
        },
        })