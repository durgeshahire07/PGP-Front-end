import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button, Linking } from 'react-native'
import { Drawer } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Icon, Container, Body, H3, Header, Content, Thumbnail, ListItem, Left, Right, List, Footer, FooterTab } from 'native-base'
import { Switch } from 'react-native-gesture-handler';

import { UserContext } from '../userContext'

function Sidebar({ ...props }) {
    const user = useContext(UserContext);
    let name = Array.from(user.userData.firstName)+','+' '+","+Array.from(user.userData.lastName)
    let email = Array.from(user.userData.emailID)
    name = name.split(',')
    console.log(name)
    let userName=[],emailId=[];
    if(name.length>10){
        userName[10] = "..."
    }
    if(email.length>24){
        emailId[24] = "..."
    }
    for(var i=0;i<24;i++){
        emailId[i]= email[i];
    }
    for(var i=0;i<10;i++){
        userName[i] = name[i]
    }

    

    return (
        <Container>
            <Header androidStatusBarColor="#310080" style={{ backgroundColor: '#4700b3', height: 80 }}>
                
                <ListItem thumbnail>
                    <View style={{}}>
                    <Left style={{flex:1, paddingHorizontal:35, paddingVertical: 10 }}>
                        <Thumbnail
                            source={{
                                uri: 'https://i.stack.imgur.com/34AD2.jpg'
                            }}
                        />
                        <View style={{paddingLeft:10,paddingVertical:5}}>
                            <H3 style={{
                                fontFamily: 'nunito-regular',
                                color: "#fff"
                            }}
                            >Hey, {userName}</H3>
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
                        onPress={() =>Linking.openURL('https://google.com') }
                    />
                    <DrawerItem
                        label="Log Out"
                        icon={({ color, size }) => <Icon name="log-out"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => { props.navigation.navigate('Home') }}
                    />

                </DrawerContentScrollView>

            </Content>


        </Container>

    )
}

export default Sidebar;