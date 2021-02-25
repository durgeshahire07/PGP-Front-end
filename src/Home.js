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
    SafeAreaView,
    Image,
    ImageBackground,
    Pressable,


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
import { color } from 'react-native-reanimated';
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

        const display = () => {
            if (surveyList.data.surveys.length) {
                console.log(surveyList.data.surveys)
                return (
                   
                    <Pressable style={styles.box}
                        android_ripple={{ color: '#fff' }}
                        onPress={() => navigation.push('Daily', { type: surveyList.data.surveys[0].surveyType })}
                    >



                        {/* <TouchableOpacity onPress={() => navigation.push('Daily', { type: surveyList.data.surveys[0].surveyType })} > */}

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingHorizontal:5,paddingVertical:10 }}>
                                        <Feather
                                            name="alert-circle"
                                            size={55}
                                            color="#fff"
                                        />
                                    </View>
                                    <View >
                            <Text style={{
                                color: '#fff',
                                fontFamily: 'nunito-semi',
                                fontSize: 22,
                                marginTop:10
                            }}>{surveyList.data.surveys.length} Survey pending!</Text>
                          
                           <Text style={{fontFamily:'nunito-semi',color:'#fff',fontSize:15}}>
                              Tap to get your {surveyList.data.surveys[0].surveyType} survey done.
                           </Text>
                           </View>
                        </View>
                        
                    </ Pressable>
                  
                    )
            }
        }

        let surveyUpdate = display();

        console.log(surveyList.data.surveys.length)
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <StatusBar backgroundColor='#3d0099' barStyle="light-content" />
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
                        <Text>DASHBOARD</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
};

const Screen1Content = ({ navigation }) => {
    return (
        <SafeAreaView >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
                <View style={{ alignItems: 'center', }}>
                    <ImageBackground source={require('../assets/icons/violet-back.jpg')}
                        style={{

                            height: 200,
                            width: 200,
                            borderBottomRightRadius: 30
                        }}>
                        {/* <View style={{flex:1,alignItems:'center',paddingTop:20}}>
                <Image
                style={{width:100,height:100,borderRadius:50}}
                source={{uri:'https://i.stack.imgur.com/34AD2.jpg'}}
                />
            </View> */}
                    </ImageBackground>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, paddingTop: 20 }}>
                    <View style={{ borderBottomWidth: 2, flexDirection: 'row', borderBottomColor: '#b380ff', paddingBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'nunito-bold', fontSize: 18, color: '#4700b3' }}>FIRST NAME</Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder='firstname'
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, paddingTop: 5 }}>
                    <View style={{ borderBottomWidth: 2, flexDirection: 'row', borderBottomColor: '#b380ff', paddingBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'nunito-bold', fontSize: 18, color: '#4700b3' }}>LAST NAME</Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder='firstname'
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, paddingTop: 5 }}>
                    <View style={{ borderBottomWidth: 2, flexDirection: 'row', borderBottomColor: '#b380ff', paddingBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'nunito-bold', fontSize: 18, color: '#4700b3' }}>LAST NAME</Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder='firstname'
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, paddingTop: 5 }}>
                    <View style={{ borderBottomWidth: 2, flexDirection: 'row', borderBottomColor: '#b380ff', paddingBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'nunito-bold', fontSize: 18, color: '#4700b3' }}>LAST NAME</Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder='firstname'
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        
        backgroundColor: "#ffb31a",
        borderRadius: 10,
        elevation: 10,
        
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
        color: '#000000',
        paddingHorizontal: 20,
        fontSize: 18
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