import React,{useState,useEffect} from 'react';
import { ScrollView,View,FlatList} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HomeComp from '../components/HomeComp';
import Loader from '../components/Loader';
import {Constants, Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
//import AsyncStorage from '@react-native-community/async-storage';



export default function Home ({navigation}) {  
 
 const [Loading, setLoading] = useState(true);
 const [msg,setmsg]=useState([]);
 const [cat,setcat]=useState([]);
 const [l,setl]=useState(0);
 const localNotification = { title: 'Message', body: 'check for new message!', sound: 'email-sound.wav'};
 const notification =() =>{
  
const schedulingOptions = {
    time: (new Date()).getTime() 
}
Notifications.scheduleLocalNotificationAsync(
    localNotification, schedulingOptions
);
 }
 const handleNotification = () => {
  console.warn('ok! got your notif');
  
};

const _getNotificationPermissions = () => (
  new Promise(async (resolve, reject) => {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
          let finalStatus = existingStatus

          if (existingStatus !== 'granted') {

              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
              finalStatus = status
          }

          if ('granted' === finalStatus) {

              if ('android' === Platform.OS) {
                  Expo.Notifications.createChannelAndroidAsync('test-members', {
                      name: 'Mail Service',
                      sound: true,
                  })
              }

              const token = await Notifications.getExpoPushTokenAsync()
              token.then(resolve(token))
                  .catch(() => reject('Notifications allowed but there occurs an error at receiving the expo Token.'))
          } else {
              reject('Notifications not allowed. Status: ' + finalStatus)
          }
      }))

const readtips =  async() => {
  //const [permission, askForPermission] = usePermissions(Permissions.CAMERA, { ask: true });
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Hey! You might want to enable notifications.');
  }
  else{ 
    console.log('RandomNumber:');
  var RandomNumber = Math.floor(Math.random() * 21) + 1 ;
  
  console.log(RandomNumber);
   fetch('http://192.168.1.107/project/getmsg.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        userid:userid,
      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason === 'No message Yet')settext(responseJason);
      else {setmsg(responseJason.results);setl(msg.length); }
       }).catch((error)=>{
       console.error(error);
      })
  }}
  const readcat=()=>{
    fetch('http://192.168.1.113/project/getcats.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     

      })
    }) 
    .then((response)=> response.json())
    .then((responseJason)=>{
      if(responseJason==='No cat Yet')alert(responseJason);
      else {setcat(responseJason.results);}
       }).catch((error)=>{
       console.error(error);
      })}
  useEffect(() => {
    readtips(); 
    if(l>=1){
      _getNotificationPermissions ();
    notification();
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
    }
  }, [])
  useEffect(() => {
readcat();  
  })

 setTimeout(() => {
  setLoading({
    Loading: false,
  });
}, 2500);
  
  return(
  
    
   <ScrollView >
     {/*<View><Sth tip={tip}/></View>*/}
           <Loader loading={Loading} />
    {/*<View  style={{width: 'auto', height: 'auto',alignItems:'center',marginTop:20,}}>
     <HomeComp pic={require('../images/f2.png')} title={'Food'}       navigation={navigation}/>
     <HomeComp pic={require('../images/s1.jpg')} title={'Sweet'}      navigation={navigation}/>
     <HomeComp pic={require('../images/a4.jpg')} title={'Art'}        navigation={navigation}/>
     <HomeComp pic={require('../images/c1.jpg')} title={'Craft'}      navigation={navigation}/>
     <HomeComp pic={require('../images/ac1.jpg')} title={'Jewelery'}   navigation={navigation}/>
     <HomeComp pic={require('../images/p1.jpg')} title={'paintings'}  navigation={navigation}/>
     <HomeComp pic={require('../images/fu2.jpg')} title={'Furniture'} navigation={navigation}/>
     <HomeComp pic={require('../images/clo.jpg')} title={'clothes and knitting'} navigation={navigation}/>
  <HomeComp pic={require('../images/others.png')} title={'others'}     navigation={navigation}/>
   
   <KeyboardSpacer/>
   
  </View>*/}
      <FlatList
          data={cat}  
          renderItem={({item})=>(
<View  style={{width: 'auto', height: 'auto',alignItems:'center',marginTop:20,}}>
<HomeComp pic={item.image} title={item.name} navigation={navigation}/>
            </View>
          )}  />
  </ScrollView>
    );

}
//AppRegistry.registerComponent('Appname', () => Home);