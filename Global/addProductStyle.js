import { StyleSheet} from 'react-native';

const addProductStyle = StyleSheet.create({
    Form:{
        borderRadius:15,
        padding:10,
        paddingTop:40,
        paddingBottom:30, 
        backgroundColor:'white',
        borderColor:'#dc143c',
        borderWidth:2,
        height:450,
        shadowColor: "#000",
        shadowOffset: {	width: 0,	height: 12,},
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    Title:{
        textAlign:'center',
        fontSize:17,
        padding:5,
        fontWeight:'bold',
        height:35,
     
    },

    Titles:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        paddingBottom:30,
        color:'#dc143c',//crimson
  
    },

    second:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    input:{
        textAlign:'center',
        borderWidth:1,
        padding:10,
        borderRadius:15,
        marginBottom:10,
        borderColor:'black',
        borderBottomColor:'black',
        height:40,
        width:180,
  
    },
  })
  
  export default addProductStyle;