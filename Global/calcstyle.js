import { StyleSheet} from 'react-native';

const CalcStyle = StyleSheet.create({
    container:{
        paddingTop:40, 
        paddingBottom:40,
        backgroundColor:'white',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:50,
    },

    Title:{
      textAlign:'center',
      fontSize:15,
      padding:5,
      fontWeight:'bold',
      height:35,
    },

    button:{
      padding:10,
      flexDirection:'row',
      justifyContent:'space-between',
    },

    row:{
        padding:5,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#dd4e4e',
        borderBottomWidth:1,
    },

    Forms:{
        borderRadius:15,
        padding:10,
        paddingTop:30,
        paddingBottom:30, 
        backgroundColor:'white',
        height:'auto',
        shadowColor: "#000",
        shadowOffset: {	width: 0,	height: 5,},
        shadowOpacity: 0.28,
        shadowRadius: 5.00,
        elevation: 4,
        marginBottom:20,
        width:'94%',
        backgroundColor:'lightgray'
    },

    input:{
        textAlign:'center',
        height:30,
        width:90,
    },

    inputs:{
      backgroundColor:'white',
      textAlign:'center',
      borderWidth:1,
      borderRadius:15,
      borderColor:'black',
      height:40,
      width:110, 
  },
})

    export default CalcStyle;