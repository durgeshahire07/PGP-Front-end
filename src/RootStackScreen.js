import React from 'react'
import {

} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignUp from '../src/SignUp'
import Login from '../src/Login'
import ForgotPass from '../src/ForgotPass'
import Otp from '../src/Otp'
import NewPass from '../src/NewPass'
const Stack = createStackNavigator();

const RootStackScreen = () => {
    return(
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="NewPass" component={NewPass} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RootStackScreen