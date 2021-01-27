import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Drawer } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Icon, Container, Body,H3, Header, Content, Thumbnail,ListItem,Left, Right,List } from 'native-base'
import { Switch } from 'react-native-gesture-handler';

function Sidebar({ ...props }) {
    return (
        <Container>
            <Header  androidStatusBarColor="#310080" style={{ backgroundColor: '#4700b3',height: 84}}>
                <View style={{flex: 1}}>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail 
                         source={{
                             uri: 'https://i.stack.imgur.com/34AD2.jpg'
                         }}
                        />
                    </Left>
                    <Body>
                        <H3 style={{color: "#fff"}}>FirstName</H3>
                        <Text style={{color: '#fff'}}>email@gamil.com</Text>
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

                </DrawerContentScrollView>
                {/* <List>
                    <ListItem>
                        <Body>
                            <Text>Dark Mode</Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                </List> */}
            </Content>


        </Container>

    )
}

export default Sidebar;