import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
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
    Button,
    Modal
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
    // console.log(user.userData)
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
                        setSurveyList({
                            ...surveyList,
                            isLoading: false
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
                ToastAndroid.show(error,
                    ToastAndroid.SHORT)
                    setSurveyList({
                        ...surveyList,
                        isLoading: false
                    })
            });
    }

    useEffect(() => {
        getSurveyStatus()
    }, [])

    if (surveyList.isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ paddingVertical: 14 }}>

                        <Feather
                            name="menu"
                            size={25}
                            color="#fff"
                        />

                    </View>

                    <Text style={styles.headerText}>Personal Growth Planner</Text>
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

                return (

                    <Pressable style={styles.box}
                        android_ripple={{ color: '#fff' }}
                        onPress={() => navigation.push('Daily', { type: "weekly" })}
                    >
                        {/* <TouchableOpacity onPress={() => navigation.push('Daily', { type: surveyList.data.surveys[0].surveyType })} > */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
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
                                    marginTop: 10
                                }}>{surveyList.data.surveys.length} Survey pending!</Text>

                                <Text style={{ fontFamily: 'nunito-semi', color: '#fff', fontSize: 15 }}>
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
                        <View style={{ paddingVertical: 14 }}>
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



    const user = useContext(UserContext);

    const [data, setData] = useState({
        firstName: user.userData.firstName,
        lastName: user.userData.lastName,
        userEmailId: user.userData.emailID
    })

    const [loading, setLoading] = useState(false)
    const [button, setButton] = useState(false)

    const textInputFirstName = (first) => {
        if (first != user.userData.firstName) {
            setButton(true)
        }
        if (first == "" || data.lastName == "") {
            setButton(false)
        }

        setData({
            ...data,
            firstName: first
        })
    }

    const textInputLastName = (last) => {
        if (last != user.userData.lastName) {
            setButton(true)
        }
        if (last == "" || data.firstName == "") {
            setButton(false)
        }

        setData({
            ...data,
            lastName: last
        })
    }

    const textInputEmail = (email) => {

        setData({
            ...data,
            userEmailId: email
        })
    }

    const UpdateHandler = () => {
        setLoading(true)
            if (data.lastName == user.userData.lastName && data.firstName == user.userData.firstName) {
                setLoading(false)
                setButton(false)
                ToastAndroid.show("No change!",
                    ToastAndroid.LONG)
            }
            else {
                updateInfo();
            }
    }

    async function updateInfo() {
        try {
            var config = {
                method: 'patch',
                url: 'http://192.168.43.19:3000/api/v1/auth/updateInfo',
                headers: {},
                data: {
                    userID: user.userData.userID,
                    update: {
                        "firstName": data.firstName,
                        "lastName": data.lastName
                    }
                }
            };
            const response = await axios(config)
            console.log(response)
            if (response.data.success) {
                setLoading(false)
                user.setUserData({
                    ...user.userData,
                    lastName: data.lastName,
                    firstName: data.firstName
                })
                ToastAndroid.show("Profile Updated 👍",
                    ToastAndroid.LONG)
            }
            else {
                setLoading(false)
                ToastAndroid.show("Something went wrong...",
                    ToastAndroid.LONG)

            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            ToastAndroid.show(error,
                ToastAndroid.LONG)

        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={{ paddingVertical: 14 }}>
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <Modal transparent={true} visible={loading} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </Modal>
                <View style={{ flex: 1, paddingHorizontal: 20 }}>

                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                            // source={{ uri: 'https://i.stack.imgur.com/34AD2.jpg' }}
                            source={require('../assets/icons/user.png')}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text
                                style={{
                                    fontFamily: 'nunito-semi',
                                    fontSize: 15,
                                    color: 'grey'

                                }}
                            >First Name</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                // placeholder="First Name"
                                placeholder={user.userData.firstName}
                                defaultValue={user.userData.firstName}
                                onChangeText={(first) => textInputFirstName(first)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text
                                style={{
                                    fontFamily: 'nunito-semi',
                                    fontSize: 15,
                                    color: 'grey'
                                }}
                            >Last Name</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder={user.userData.lastName}
                                defaultValue={user.userData.lastName}
                                onChangeText={(last) => textInputLastName(last)}
                            />

                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text
                                style={{
                                    fontFamily: 'nunito-semi',
                                    fontSize: 15,
                                    color: 'grey'
                                }}
                            >Email Id</Text>
                        </View>
                        <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                            <TextInput
                                placeholder="Email Id"
                                defaultValue={user.userData.emailID}
                                keyboardType="email-address"
                                onChangeText={(email) => textInputEmail(email)}
                                editable={false}
                            />
                            <View style={{ marginLeft: 'auto', justifyContent: 'center' }}>
                                <TouchableOpacity 
                                onPress={() => navigation.push('emailUpdate')}
                                >
                                    <Text style={{ color: '#006699' }}>change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text
                                style={{
                                    fontFamily: 'nunito-semi',
                                    fontSize: 15,
                                    color: 'grey'
                                }}
                            >Password</Text>
                        </View>
                        <View style={[styles.inputContainer, { flexDirection: 'row' }]}>

                            <TextInput
                                editable={false}
                                value="●●●●●●●●"
                            />

                            <View style={{ marginLeft: 'auto', justifyContent: 'center' }}>
                                <TouchableOpacity>
                                    <Text style={{ color: '#006699' }}>change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {button ?
                        <View style={{ alignItems: 'center' }}>

                            <View style={{ paddingVertical: 10, paddingTop: 20 }}>

                                <Pressable onPress={UpdateHandler}
                                    android_ripple={{ color: '#fff' }}
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor: '#006699',
                                        paddingHorizontal: 70,
                                        paddingVertical: 15,
                                        backgroundColor: '#4700b3'
                                    }} >

                                    <Text style={{
                                        fontFamily: 'nunito-bold',
                                        fontSize: 17,
                                        color: '#fff'
                                    }}>Update Profile!</Text>

                                </Pressable>

                            </View>
                        </View>
                        : null}
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
    inputContainer: {
        paddingTop: 10,
        borderWidth: 1.3,
        borderColor: '#bfbfbf',
        borderRadius: 10,
        // backgroundColor: '#e6e6ff',
        paddingVertical: 10,
        paddingHorizontal: 15,
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
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
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