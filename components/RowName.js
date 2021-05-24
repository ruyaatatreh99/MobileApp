import * as React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, Text, View ,TextInput,Button,ImageBackground,ScrollView,SafeAreaView} from 'react-native';

export default function Claculate({Title,first,second,third}) {
    return(
        <View>
            <Text style={styles.Title}>{Title} </Text>
            <View style={styles.row}>
                <Text style={styles.input}>{first}</Text>
                <Text style={styles.input}>{second}</Text>
                <Text style={styles.input}>{third}</Text>
            </View>
               
        </View>
    );
}

const styles = StyleSheet.create({
    Title:{
        textAlign:'center',
        fontSize:15,
        padding:5,
        fontWeight:'bold',
        height:35,
    },
    row:{
        padding:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#dd4e4e',
        borderBottomWidth:1,
    },
    input:{
        textAlign:'center',
        height:30,
        width:90,
    },
    })