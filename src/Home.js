import React,{ useContext } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,

} from 'react-native';
import {Icon} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Sidebar from '../src/customDrawer'
import Daily from './Daily';
import { FlatList } from 'react-native-gesture-handler';
import { UserContext } from '../userContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

const HomeContent = ({navigation }) => {
    const user = useContext(UserContext);
    console.log("home")
    
    return (
        
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#310080' barStyle="light-content" />
                <View style={styles.header}>
                <View style={{ paddingTop: 13 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Feather
                                name="menu"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                            </View>
                            <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft: 15,
                        paddingTop: 10
                    }}>Personal Growth Planner</Text>
                </View>
                <View
                    style={styles.footer}
                >
                    
                        <View style={styles.box}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Daily')} >
                            <Text style={ {
                                color: '#4700b3',
                                textAlign: 'center',
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                paddingVertical: 25
                            }}>Take your Daily Survey!</Text>
                            </ TouchableOpacity>
                        </View>
                    

                      

                  
                </View>


            </ScrollView>
        </View>
    );
};

const Screen1Content = ({navigation}) =>{
    return(
    <View style={{flex:1}}>
        <View style={{flexDirection: 'row',
        backgroundColor: "#4700b3",
        height: 50,
        elevation: 10,
        paddingLeft: 10}}>
                <View style={{ paddingTop: 13 }}>
                        <TouchableOpacity onPress={()=> navigation.openDrawer()}>
                            <Feather
                                name="menu"
                                size={24}
                                color="#fff"
                            />
                            </TouchableOpacity>
                            </View>
                            <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft: 15,
                        paddingTop: 10
                    }}>User Profile</Text>
                </View>
        <View style={{ }}>

        </View>
    </View>
    )
}


const Home = () => {
    return(
        <Drawer.Navigator initialRouteName={'Home'} drawerContent={props => <Sidebar {...props} />}>
        <Drawer.Screen name="Home" component={HomeContent}
          options={{
            drawerIcon: ({color,size}) => (
              <Icon name="home" style={{fontSize: size, color:color}} />
  )
          }}
        />
        <Drawer.Screen name="Profile" component={Screen1Content} 
         options={{
            drawerIcon: ({color,size}) => (
              <Icon name="person" style={{fontSize: size, color:color}} />
  )
          }}
        
        />
      </Drawer.Navigator>
    )
}

export default Home;





const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#4700b3",
        height: 50,
        elevation: 10,
        paddingLeft: 10
    },
    box:{ 
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20,
        elevation: 15
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomColor: '#b380ff',
        borderBottomWidth: 2,
    },
    textInput: {
        fontFamily: 'nunito-regular',
        flex: 1,
        color: '#000000',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 10,
    },
    signIn: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    textSign: {
        fontSize: 20,
        fontFamily: 'nunito-bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        fontFamily: 'nunito-regular',
        color: 'grey'
    },
});