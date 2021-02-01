import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React,{ useContext }from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Drawer } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Icon, Container, Body, H3, Header, Content, Thumbnail, ListItem, Left, Right, List, Footer, FooterTab } from 'native-base'
import { Switch } from 'react-native-gesture-handler';

import { UserContext } from '../userContext'

function Sidebar({ ...props }) {
    const user = useContext(UserContext);
    console.log(user.userData.firstName)
    return (
        <Container>
            <Header androidStatusBarColor="#310080" style={{ backgroundColor: '#4700b3', height: 84 }}>
                <View style={{ flex: 1 }}>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail
                                source={{
                                    uri: 'https://i.stack.imgur.com/34AD2.jpg'
                                }}
                            />
                        </Left>
                        <Body>
                        <H3 style={{ color: "#fff" }}>{user.userData.firstName} {user.userData.lastName}</H3>
                                            <Text style={{ color: '#fff' }}>{user.userData.emailID}</Text>
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
                        </Body>
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
                        onPress={() => props.navigation.push('Login')}
                    />

                </DrawerContentScrollView>

            </Content>


        </Container>

    )
}

export default Sidebar;