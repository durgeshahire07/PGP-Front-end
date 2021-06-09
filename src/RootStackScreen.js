import React,{useEffect,useContext} from 'react'
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
import userInfo from '../src/userInfo'
import { UserContext } from '../userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Tabs } from 'native-base'
const Stack = createStackNavigator();
const AppDrawer = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return(
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="userInfo" component={userInfo} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="ForgotPass" component={ForgotPass} />
    <AuthStack.Screen name="NewPass" component={NewPass} />
    <AuthStack.Screen name="Otp" component={Otp} />
  </AuthStack.Navigator>
  )
}

const AppDrawerScreen = () => {
  return(
  <AppDrawer.Navigator headerMode='none'>
    <AppDrawer.Screen name="Home" component={Home} />
    <AppDrawer.Screen name="Daily" component={Daily} />
  </AppDrawer.Navigator>
  )
}

const RootStackScreen = () => {
  

  const user = useContext(UserContext);

//   async function getItem (){
//     const user1 = await AsyncStorage.getItem('userProfile')
    
//     const userProfile = JSON.parse(user1)
//     if(user1!==null){
//       user.setUserData({
//         emailID: userProfile.emailID,
//         firstName: userProfile.firstName,
//         lastName: userProfile.lastName,
//         userID: userProfile.userID,
//         token: "1"
//     })
//     console.log(user1)
//       console.log("hmm",user.userData)
//     }
    
//  }
//  useEffect(()=>{
  
//   getItem();

// },[])
  // return (
  //   user.userData.token==="1" ? (
  //     <>
  //     <NavigationContainer>
  //     <Stack.Navigator headerMode='none'>
  //       <Stack.Screen name="Home" component={Home} />
  //       <Stack.Screen name="Daily" component={Daily} />
  //       </Stack.Navigator>
  //       </NavigationContainer>
  //     </>
  //   ) : (
  //     <>
  //     <NavigationContainer>
  //     <Stack.Navigator headerMode='none'>
  //       <Stack.Screen name="SignUp" component={SignUp} />
  //       <Stack.Screen name="Login" component={Login} />
  //       </Stack.Navigator>
  //       </NavigationContainer>
  //     </>
  //   ) 
  // )
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Auth" component={AuthStackScreen} />
        <Stack.Screen name="App" component={AppDrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackScreen