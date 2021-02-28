import React from 'react'
import {

} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignUp from '../src/SignUp'
import Login from '../src/Login'
import ForgotPass from '../src/ForgotPass'
import Otp from '../src/Otp'
import NewPass from '../src/NewPass'
import Home from '../src/Home'
import Daily from '../src/Daily'
import emailUpdate from '../src/emailUpdate'
// import { Tabs } from 'native-base'
const Stack = createStackNavigator();
// const AppDrawer = createStackNavigator();
// const AuthStack = createStackNavigator();

// const AuthStackScreen = () => {
//   return(
//   <AuthStack.Navigator headerMode='none'>
//     <AuthStack.Screen name="SignUp" component={SignUp} />
//     <AuthStack.Screen name="Login" component={Login} />
//     <AuthStack.Screen name="ForgotPass" component={ForgotPass} />
//     <AuthStack.Screen name="NewPass" component={NewPass} />
//     <AuthStack.Screen name="Otp" component={Otp} />
//   </AuthStack.Navigator>
//   )
// }

// const AppDrawerScreen = () => {
//   return(
//   <AppDrawer.Navigator headerMode='none'>
//     <AppDrawer.Screen name="Home" component={Home} />
//     <AppDrawer.Screen name="Daily" component={Daily} />
//   </AppDrawer.Navigator>
//   )
// }

const RootStackScreen = () => {
  // return (
  //   <NavigationContainer>
  //     <AuthStackScreen />
  //     <AppDrawerScreen />
  //   </NavigationContainer>
  // )
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="emailUpdate" component={emailUpdate} />
        <Stack.Screen name="Daily" component={Daily} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="NewPass" component={NewPass} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackScreen