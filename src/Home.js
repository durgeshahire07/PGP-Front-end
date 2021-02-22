import React, { useContext, useEffect, useState } from 'react';
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
    ToastAndroid,
    ActivityIndicator,
    SafeAreaView

} from 'react-native';
import { Icon } from 'native-base'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Sidebar from '../src/customDrawer'
import Daily from './Daily';
import { FlatList } from 'react-native-gesture-handler';
import { UserContext } from '../userContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

const HomeContent = ({ navigation }) => {
    const user = useContext(UserContext);
    console.log(user.userData)
    const [surveyList, setSurveyList] = useState({
        data: '',
        isLoading: true
    });
    const userId = {
        "userID": user.userData.userID
    }

    const getSurveyStatus = () => {
        var config = {
            method: 'post',
            url: 'http://192.168.43.19:3000/api/v1/survey/surveyStatus',
            headers: {},
            data: userId
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                    setSurveyList({
                        data: response.data,
                        isLoading: false
                    })

                }
                else {
                    ToastAndroid.show("Oops...something went wrong!",
                        ToastAndroid.LONG)
                }
            })
            .catch(function (error) {
                console.log(error);
                ToastAndroid.show(error,
                    ToastAndroid.SHORT)
            });
    }

    useEffect(() => {
        getSurveyStatus()
    }, [])

    if (surveyList.isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ paddingTop: 13 }}>

                        <Feather
                            name="menu"
                            size={25}
                            color="#fff"
                        />

                    </View>

                    <Text style={{
                        fontFamily: 'nunito-semi',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft: 10,
                        paddingTop: 10
                    }}>Personal Growth Planner</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        )
    }
    else {
        
        let surveyUpdate = surveyList.data.surveys.map((val, key) => {
            return (
                <View key={key} style={{paddingVertical: 4}}>
                    <View style={styles.box}>   
                    <TouchableOpacity onPress={() => navigation.push('Daily',{type:val.surveyType})} >
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <View style={{paddingRight:5}}>
                    <Feather
                            name="calendar"
                            size={23}
                            color="#e60000"
                        />
                        </View>
                        <Text style={{
                            color: '#e60000',
                            fontFamily: 'nunito-semi',
                            fontSize: 20,
                           
                        }}>{val.surveyType} survey update !</Text>
                    </View>
                    </ TouchableOpacity>
                    </View>
                </View>
                
            )
        })
        return (

            <SafeAreaView style={styles.container}>
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
                        <Text style={styles.headerText}>Personal Growth Planner</Text>
                    </View>
                    <View
                        style={styles.footer}
                    >

                        {surveyUpdate}

                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
};

const Screen1Content = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
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
                <Text style={styles.headerText}>User Profile</Text>
            </View>
            <View style={styles.container}>

            </View>
        </View>
    )
}


const Home = () => {
    return (
        <Drawer.Navigator initialRouteName={'Home'} drawerContent={props => <Sidebar {...props} />}>
            <Drawer.Screen name="Home" component={HomeContent}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home" style={{ fontSize: size, color: color }} />
                    )
                }}
            />
            <Drawer.Screen name="Profile" component={Screen1Content}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person" style={{ fontSize: size, color: color }} />
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
    headerText:
    {
        fontFamily: 'nunito-bold',
        fontSize: 20,
        color: '#fff',
        paddingLeft: 15,
        paddingTop: 10
    },
    box: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        paddingVertical:20
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