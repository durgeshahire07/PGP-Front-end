import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useEffect,useState } from 'react'
import { Text, View, StyleSheet, Button, Linking } from 'react-native'
import { Drawer } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Icon, Container, Body, H3, Header, Content, Thumbnail, ListItem, Left, Right, List, Footer, FooterTab } from 'native-base'
import { Switch } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../userContext'

function Sidebar({ ...props }) {

    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })

    const user = useContext(UserContext);
    // console.log("drawer",user.userData)
    // async function getItem() {
    //     try {
    //         const val = await AsyncStorage.getItem('userProfile')
    //         const userProfile = JSON.parse(val)
    //         setUserData ( {
    //             firstName: userProfile.firstName,
    //             lastName: userProfile.lastName,
    //             email: userProfile.emailID,
    //         })
            
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //      getItem()
        
    // }, [])
  
        
  
   
    // let name = Array.from(userData.firstName) + ',' + ' ' + ',' + Array.from(userData.lastName)
    // let email = Array.from(userData.email)
    let name = Array.from(user.userData.firstName) + ',' + ' ' + ',' + Array.from(user.userData.lastName)
    let email = Array.from(user.userData.emailID)
    name = name.split(',')
    // console.log(name)
    let userName = [], emailId = [];
    if (name.length > 10) {
        userName[10] = "..."
    }
    if (email.length > 24) {
        emailId[24] = "..."
    }
    for (var i = 0; i < 24; i++) {
        emailId[i] = email[i];
    }
    for (var i = 0; i < 10; i++) {
        userName[i] = name[i]
    }



    return (
        <Container>
            <Header androidStatusBarColor="#310080" style={{ backgroundColor: '#4700b3', height: 80 }}>

                <ListItem thumbnail>
                    <View style={{}}>
                        <Left style={{ flex: 1, paddingHorizontal: 35, paddingVertical: 10 }}>
                            <Thumbnail
                                style={{ width: 60, height: 60 }}
                                source={require('../assets/icons/user.png')}
                            />
                            <View style={{ paddingLeft: 10, paddingVertical: 5 }}>
                                <Text style={{
                                    fontFamily: 'nunito-regular',
                                    color: "#fff",
                                    fontSize: 22
                                }}
                                >Hey, {userName}</Text>
                                <Text style={{ color: '#fff' }}>{emailId}</Text>
                            </View>
                        </Left>
                    </View>
                </ListItem>

            </Header>
            <Content>

                <DrawerContentScrollView {...props}>

                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Rate Us"
                        icon={({ color, size }) => <Icon name="star"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => Linking.openURL('https://google.com')}
                    />
                    <DrawerItem
                        label="Log Out"
                        icon={({ color, size }) => <Icon name="log-out"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => { props.navigation.navigate('Login') }}
                    />

                </DrawerContentScrollView>

            </Content>


        </Container>

    )
}

export default Sidebar;