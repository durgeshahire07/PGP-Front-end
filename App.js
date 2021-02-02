import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './userContext';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import RootStackScreen from './src/RootStackScreen'
import { NavigationContainer } from '@react-navigation/native';

import Otp from './src/Otp'
import Newpass from './src/NewPass'
import ForgotPass from './src/ForgotPass';
import Home from './src/Home'
import NewPass from './src/NewPass';
import Daily from './src/Daily'
const getFonts = () => Font.loadAsync({
    'nunito-regular' : require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold' : require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-semi' : require('./assets/fonts/Nunito-SemiBold.ttf'),
})
  
const YourApp = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  if(fontsLoaded){
    return(
      
      <UserProvider>
        <RootStackScreen />
       </UserProvider>
    )
  } else {
    return(
      <AppLoading
       startAsync={getFonts}
       onFinish={()=> setFontsLoaded(true)}
       />
    )
  }
}

// const rootElement = document.getElementById('root');
// ReactDOM.render(
//   // wrap root element with context
//   <UserProvider>
//     <App />
//   </UserProvider>,
//   rootElement
// );

export default YourApp;