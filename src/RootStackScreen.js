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
import Screen1 from '../src/Screen1'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import { Tabs } from 'native-base'
const HomeStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Screen1Stack= createStackNavigator();

const HomeStackScreen = () =>(
  <HomeStack.Navigator headerMode='none'>
    <HomeStack.Screen name="Home" component={Home}  />
  </HomeStack.Navigator>
)
const Screen1StackScreen = () =>(

  <Screen1Stack.Navigator headerMode='none'>
    <Screen1Stack.Screen name="Screen1" component={Screen1} />
  </Screen1Stack.Navigator>
)
const HomeDrawer = () =>{
  return(
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Screen1" component={Screen1StackScreen} />
      </Drawer.Navigator>
  )
}
const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeDrawer} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="NewPass" component={NewPass} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackScreen