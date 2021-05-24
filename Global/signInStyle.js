import { StyleSheet} from 'react-native';

const signInStyle = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center", 
        justifyContent:"center",
    },

    Form:{
        fontFamily:'Cochin',
        borderRadius:15,
        padding:10,
        paddingTop:40,
        paddingBottom:30, 
        backgroundColor:'white',
        borderColor:'#dc143c',
        borderWidth:2,
        height:450,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 12,},
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    input:{
        fontFamily:'Cochin',
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
    Title:{
        fontFamily:'Cochin',
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
        fontFamily:'Cochin',
    },

    first:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:5,
        marginBottom:5, 
    },

    second:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
      },
});

  export default signInStyle;