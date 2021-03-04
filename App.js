import React, { useState,useEffect,useMemo } from 'react';
import ReactDOM from 'react-dom';

import { UserProvider } from './userContext';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import RootStackScreen from './src/RootStackScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import Otp from './src/Otp'
import Newpass from './src/NewPass'
import ForgotPass from './src/ForgotPass';
import Home from './src/Home'
import NewPass from './src/NewPass';
import Daily from './src/Daily'
import { } from 'react-native-animatable';
import { ActivityIndicator,View,Image  } from 'react-native';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  'nunito-semi': require('./assets/fonts/Nunito-SemiBold.ttf'),
})

const YourApp = () => {

 const [isLoading, setIsLoading] = useState(true)
 const [userToken, setUserToken] = useState(null)
 const [fontsLoaded, setFontsLoaded] = useState(false)
 
 const authContext = useMemo(()=>({
   signIn: ()=> {
     setUserToken('hfe');
   },
   signOut: ()=> {
    setUserToken(null);
   },
   signUp: ()=>{
    setUserToken('hfe');
   },
 }));

//  useEffect(()=>{
//    setTimeout(()=>{
//      setIsLoading(false)
//    },3000)
//  },[])
 

// if( isLoading ){
//   return(
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//       {/* <ActivityIndicator size="large" color="#0000ff" /> */}
//       <Image style={{width:400,height:400}} source={require('./assets/gif/welcome.gif')} />
//     </View>
//   )
// }
 
 
  if (fontsLoaded) {
    return (
      <UserProvider>
        <RootStackScreen />
      </UserProvider>
    )
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
}

export default YourApp;