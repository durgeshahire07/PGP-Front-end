import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React,{ useContext }from 'react'
import { Text, View, StyleSheet, Button, Linking } from 'react-native'
import { Drawer } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Icon, Container, Body, H3, Header, Content, Thumbnail, ListItem, Left, Right, List, Footer, FooterTab } from 'native-base'
import { Switch } from 'react-native-gesture-handler';

import { UserContext } from '../userContext'

function Sidebar({ ...props }) {
    const user = useContext(UserContext);
    return (
        <Container>
            <Header androidStatusBarColor="#310080" style={{ backgroundColor: '#4700b3', height: 65 }}>
                <View style={{ flex: 1,justifyContent:'flex-start',paddingTop:15 }}>
                    <ListItem thumbnail>
                        {/* <Left>
                            <Thumbnail
                                source={{
                                    uri: 'https://i.stack.imgur.com/34AD2.jpg'
                                }}
                            />
                        </Left> */}
                        <Left>
                        <H3 style={{ fontFamily:'nunito-regular',color: "#fff" }}>Hey, {user.userData.firstName} {user.userData.lastName}</H3>
                                            {/* <Text style={{ color: '#fff' }}>{user.userData.emailID}</Text> */}
                            {/* <UserContext.Consumer>
                                {
                                    user => {
                                        return (<View>
                                            <H3 style={{ color: "#fff" }}>{user.firstName}</H3>
                                            <Text style={{ color: '#fff' }}>email@gamil.com</Text>
                                        </View>)
                                    }
                                }
                            </UserContext.Consumer> */}
                        </Left>
                    </ListItem>
                </View>
            </Header>
            <Content>

                <DrawerContentScrollView {...props}>

                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Rate Us"
                        icon={({ color, size }) => <Icon name="star"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        label="Log Out"
                        icon={({ color, size }) => <Icon name="log-out"
                            style={{ fontSize: size, color: color }} />}
                            onPress={ ()=>{ Linking.openURL('https://google.com')}}
                    />

                </DrawerContentScrollView>

            </Content>


        </Container>

    )
}

export default Sidebar;