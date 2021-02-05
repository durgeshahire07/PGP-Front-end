import React, { useState,useEffect } from 'react';
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

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  'nunito-semi': require('./assets/fonts/Nunito-SemiBold.ttf'),
})

const YourApp = () => {

 

  // useEffect(()=>{
  //     try {
  //       const isLoggedIn = AsyncStorage.getItem('isLoggedIn')
  //       console.log(isLoggedIn)
  //     } catch (e) {
  //       console.log(e);
  //     }
  // })

  

  const [fontsLoaded, setFontsLoaded] = useState(false)
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