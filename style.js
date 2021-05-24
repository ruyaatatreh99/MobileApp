import {StyleSheet} from 'react-native';

const style=StyleSheet.create({
 
    cont:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' ,
       
      },
      a:{ 
      flex:1,
        justifyContent: 'center',
        alignItems: 'center' ,
       
      },
      nav:{
        paddingTop:30,
        backgroundColor:'#dc143c',
  

      },
      continer:{
        paddingTop:10,
        paddingLeft:20,
        paddingBottom:9,
      },
      tex:{
        padding:8,
        paddingTop:7,
       alignItems:'center',
        color:'#dc143c',
        fontSize:17,
      },
      B:{
      paddingTop:8,
      paddingLeft:100,
      paddingBottom:10,
      width:300,
      },
      input:{
        padding:8,
        width:360,
        borderColor:'black',
        borderBottomWidth:0.5,
        color:'#dc143c',
        fontSize:20,
      },
      SearchText:{
       flex:1,
        fontSize:20,
        margin:5,
        backgroundColor:'#0000',
      },
      SearchT:{
        borderColor:'#dc143c',
        borderBottomWidth:1.5,
        flexDirection:'row',
        paddingBottom:2,
      },
      SearchView:{
      padding:10,
      },
     HomeView:{
      justifyContent: "center",
      flexDirection: "row",
      height: 180,
      borderColor:'black',
      borderWidth:1, 
     },
     Homebutton:{
      alignItems: "center",
      backgroundColor: '#dc143c',
      height:"100%",
     },
     HomeText:{
       padding:50,
      alignItems: "center",
      fontSize:25,
     },
    card:{
      flex:1,
      alignContent:'stretch',
      flexDirection: "row",
      justifyContent:'space-around',
    },

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

  Titles:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    paddingBottom:30,
    color:'#dc143c',//crimson
  
    shadowColor: "#000",
    shadowOffset: {	width: 0,	height: 5,},
    shadowOpacity: 0.28,
    shadowRadius: 4.00,
    elevation: 4,
},

Title:{
  textAlign:'center',
  fontSize:17,
  padding:5,
  fontWeight:'bold',
  height:35,
 
},

second:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-between',
},
Shadow:{
  shadowColor: "#000",
  shadowOffset: {	width: 0,	height: 15,},
  shadowOpacity: 0.48,
  shadowRadius: 10.00,
  marginTop:10,
  marginBottom:5,
  elevation: 24,
},


    });
    
  export default style;