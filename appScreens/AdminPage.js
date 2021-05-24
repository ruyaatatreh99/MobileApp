import 'react-native-gesture-handler'
import React,{useState} from 'react';
import {View,ScrollView,Text,} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Avatar, Divider,Overlay,Icon,ActivityIndicator } from 'react-native-elements';
import AddProduct from './Addworkshop';
import WorkshopComp from '../components/AdminPost';


export default function AdminPage () {   
  const [UserName,SetUserName]=useState('UserName');
  const [Bio,SetBio]=useState('Bio');
  const [Contacts,SetContacts]=useState('Contacts'); 
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
    return (  
      <ScrollView>  
        <View style={{flexDirection:'row',flex:1,padding:10}}>
          
          <View style={{marginTop:30}} >
          <Avatar 
            size="large"
            rounded
            icon={{name: 'user', color: 'white', type: 'font-awesome' }}
            overlayContainerStyle={{backgroundColor: 'gray'}}
            activeOpacity={0.1}></Avatar> 
         </View>
        <View style={{flexDirection:'column',flex:1,padding:10}}>
          <Text style={{padding:8,fontSize:18}}> {UserName} </Text>
          <Text style={{padding:8,fontSize:18}}>{Bio} </Text>
          <Text style={{padding:8,fontSize:18}}>{Contacts} </Text>
        </View>

        <Icon name='add' color='#dc143c' size={35}  onPress={toggleOverlay} />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
          <AddProduct/>
        </Overlay>
    
        </View>

       <Divider style={{backgroundColor:'#dc143c',marginLeft:10,marginRight:10 ,marginBottom:10,}}/>

       <View >
       <WorkshopComp/>
     <WorkshopComp/>
     <WorkshopComp/>
     <WorkshopComp/>
     <WorkshopComp/>

        </View>
       <KeyboardSpacer/>
      </ScrollView>
    );   
}  
