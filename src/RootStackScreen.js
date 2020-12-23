import React from 'react'
import {

} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import SignUp from '../src/SignUp'
import Login from '../src/Login'
import ForgotPass from '../src/ForgotPass'
import Otp from '../src/Otp'
import NewPass from '../src/NewPass'
import Home from '../src/Home'
import Daily from '../src/Daily'
// import { Tabs } from 'native-base'
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStackScreen = () =>{
  return(
  <HomeStack.Navigator >
    <HomeStack.Screen name="Home" component = {Home} />
  </HomeStack.Navigator> 
  // <NavigationContainer>
  //   <Tabs.Navigator>
  //     <Tabs.Screen name="Home" component={Home} />
  //   </Tabs.Navigator>
  // </NavigationContainer>
  )
}
const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeStackScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="NewPass" component={NewPass} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackScreen