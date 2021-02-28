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
import { back } from 'react-native/Libraries/Animated/src/Easing';
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
    const [screen, setScreen] = useState('')
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



    const [modalInput, setModalInput] = useState({
        newEmail: '',
        pass: '',
        newPass: '',
        confirmPass: ''
    })

    const updateNewEmail = (email) => {
        setModalInput({
            ...modalInput,
            newEmail: email
        })

    }
    const updatePass = (pass) => {
        setModalInput({
            ...modalInput,
            pass: pass
        })

    }
    const updateConfirmPass = (cPass) => {
        setModalInput({
            ...modalInput,
            confirmPass: cPass
        })

    }
    const updateNewPass = (newPass) => {
        setModalInput({
            ...modalInput,
            newPass: newPass
        })

    }

    const [secureEntry, setSecureEntry] = useState({
        secureTextEntry: true,
        newPass_secureTextEntry: true,
        confirm_secureTextEntry: true,

    })

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }

    const updateNewPassSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            newPass_secureTextEntry: !secureEntry.newPass_secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            confirm_secureTextEntry: !secureEntry.confirm_secureTextEntry
        });
    }

    const UpdateHandler = () => {
        setLoading(true)
        if (data.lastName == user.userData.lastName && data.firstName == user.userData.firstName) {
            setLoading(false)
            setButton(false)
            ToastAndroid.show("No change!",
                ToastAndroid.SHORT)
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

                user.setUserData({
                    ...user.userData,
                    lastName: data.lastName,
                    firstName: data.firstName
                })
                setLoading(false)
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

    async function handleSubmit() {
        if (screen === "EmailChange") {
            if (modalInput.newEmail && modalInput.pass) {
                if (modalInput.pass.length > 5) {
                    setLoading(true)

                    try {
                        var config = {
                            method: 'patch',
                            url: 'http://192.168.43.19:3000/api/v1/auth/updateEmail',
                            headers: {},
                            data: {
                                userID: user.userData.userID,
                                newEmail: modalInput.newEmail,
                                password: modalInput.pass
                            }
                        };
                        const response = await axios(config)
                        console.log(response)
                        if (response.data.success) {
                            user.setUserData({
                                ...user.userData,
                                emailID: modalInput.newEmail
                            })
                            setScreen('')
                            setModalInput({
                                ...modalInput,
                                pass: ''
                            })
                            setLoading(false)
                            ToastAndroid.show("Email successfully updated 👍",
                                ToastAndroid.LONG)
                        }
                    } catch (error) {
                        setLoading(false)
                        console.log(error)
                        if (error.response.status === 500) {
                            ToastAndroid.show("Incorrect Password!",
                                ToastAndroid.LONG)
                        }
                        else if (error.response.status === 404) {
                            ToastAndroid.show("Invalid email!",
                                ToastAndroid.LONG)
                        }
                        else {
                            ToastAndroid.show("Oops...something went wrong!",
                                ToastAndroid.LONG)
                        }
                    }


                }
                else {
                    ToastAndroid.show("Incorrect Password!",
                        ToastAndroid.SHORT)
                }
            }
            else {
                ToastAndroid.show("Please fill all the information!",
                    ToastAndroid.SHORT)
            }
        }
        else {
            if (modalInput.pass && modalInput.newPass && modalInput.confirmPass) {

                if (modalInput.newPass === modalInput.confirmPass) {
                    if (modalInput.newPass.length > 5) {
                        setLoading(true)
                        try {
                            var config = {
                                method: 'patch',
                                url: 'http://192.168.43.19:3000/api/v1/auth/updatePassword',
                                headers: {},
                                data: {
                                    userID: user.userData.userID,
                                    oldPassword: modalInput.pass,
                                    newPassword: modalInput.newPass
                                }
                            };
                            const response = await axios(config)
                            console.log(response)
                            if (response.data.success) {
                                setLoading(false)
                                setScreen('') // to close the modal
                                setModalInput({
                                    ...modalInput,
                                    pass: ''
                                }) //to reset the state of pass
                                ToastAndroid.show("Password changed successfully 👍",
                                ToastAndroid.LONG)
                            }
                            else{
                                ToastAndroid.show("else",
                                    ToastAndroid.LONG)
                            }
                        } catch (error) {
                            setLoading(false)
                            console.log(error)
                            if (error.response.status === 500) {
                                ToastAndroid.show("Incorrect password!",
                                    ToastAndroid.LONG)
                            }
                            else {
                                ToastAndroid.show("Oops...something went wrong!",
                                    ToastAndroid.LONG)
                            }
                        }
                    }
                    else {
                        ToastAndroid.show("Passwords length must be 6 characters long!",
                            ToastAndroid.LONG)
                    }
                }
                else {
                    ToastAndroid.show("Passwords don't match!",
                        ToastAndroid.LONG)
                }

            }
            else {
                ToastAndroid.show("Please fill all the information!",
                    ToastAndroid.SHORT)
            }

        }

    }
    function handleBack() {

        setScreen('')
    }

    const display = (screenName) => {

        return (
            <Modal transparent={true} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            backgroundColor: '#000000aa',
                            justifyContent: 'center'
                        }}>

                        <Animatable.View animation="fadeInUp" style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#fff' }}>
                            {screenName == "EmailChange" ?
                                <Text
                                    style={{
                                        fontFamily: 'nunito-bold',
                                        fontSize: 30
                                    }}
                                >Update Email</Text>
                                : <Text
                                    style={{
                                        fontFamily: 'nunito-bold',
                                        fontSize: 30
                                    }}
                                >Update Password</Text>
                            }
                            <View style={{ marginTop: 10 }}>
                                {screenName == "EmailChange" ?
                                    <Text style={styles.textInputTitle}
                                    >Enter your new email id and your password to change your email id</Text>
                                    :
                                    <Text style={styles.textInputTitle}
                                    >Enter your old password and new password to change your password</Text>}
                            </View>
                            {screenName == "EmailChange" ?
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ paddingVertical: 10 }}>
                                        <Text style={styles.textInputTitle}>New email address</Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            placeholder="New Email address"
                                            onChangeText={(email) => updateNewEmail(email)}
                                        />
                                    </View>
                                </View>
                                : null}

                            <View style={{ marginTop: 10 }}>
                                <View style={{ paddingVertical: 10 }}>
                                    {screenName == "EmailChange" ?
                                        <Text style={styles.textInputTitle}>Password</Text>
                                        :
                                        <Text style={styles.textInputTitle}>Old Password</Text>
                                    }
                                </View>
                                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                                    <View style={{ width: '90%' }}>
                                        {screenName == "EmailChange" ?
                                            <TextInput
                                                placeholder="Password"
                                                secureTextEntry={secureEntry.secureTextEntry ? true : false}
                                                onChangeText={(pass) => updatePass(pass)}
                                            />
                                            :
                                            <TextInput
                                                placeholder="Old Password"
                                                secureTextEntry={secureEntry.secureTextEntry ? true : false}
                                                onChangeText={(pass) => updatePass(pass)}
                                            />

                                        }
                                    </View>
                                    <View style={{ marginLeft: 'auto', justifyContent: 'center' }}>

                                        <TouchableOpacity onPress={updateSecureTextEntry}>
                                            {secureEntry.secureTextEntry ?
                                                <Feather
                                                    name="eye-off"
                                                    color="#a6a6a6"
                                                    size={17}
                                                />
                                                :
                                                <Feather
                                                    name="eye"
                                                    color="#4700b3"
                                                    size={17}
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            {screenName == "EmailChange" ? null
                                :
                                <View>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ paddingVertical: 10 }}>
                                            <Text
                                                style={styles.textInputTitle}
                                            >New Password</Text>

                                        </View>
                                        <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                                            <View style={{ width: '90%' }}>

                                                <TextInput
                                                    placeholder="New Password"
                                                    secureTextEntry={secureEntry.newPass_secureTextEntry ? true : false}
                                                    onChangeText={(value) => updateNewPass(value)}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 'auto', justifyContent: 'center' }}>
                                                <TouchableOpacity
                                                    onPress={updateNewPassSecureTextEntry}
                                                >
                                                    {secureEntry.newPass_secureTextEntry ?
                                                        <Feather
                                                            name="eye-off"
                                                            color="#a6a6a6"
                                                            size={17}
                                                        />
                                                        :
                                                        <Feather
                                                            name="eye"
                                                            color="#4700b3"
                                                            size={17}
                                                        />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ color: 'grey', fontFamily: 'nunito-semi' }}>Must be at least 6 characters long.</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ paddingVertical: 10 }}>

                                            <Text style={styles.textInputTitle}>Confirm New Password</Text>

                                        </View>
                                        <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                                            <View style={{ width: '90%' }}>

                                                <TextInput
                                                    placeholder="Confirm New Password"
                                                    secureTextEntry={secureEntry.confirm_secureTextEntry ? true : false}
                                                    onChangeText={(value) => updateConfirmPass(value)}
                                                />

                                            </View>

                                            <View style={{ marginLeft: 'auto', justifyContent: 'center' }}>

                                                <TouchableOpacity
                                                    onPress={updateConfirmSecureTextEntry}
                                                >
                                                    {secureEntry.confirm_secureTextEntry ?
                                                        <Feather
                                                            name="eye-off"
                                                            color="#a6a6a6"
                                                            size={17}
                                                        />
                                                        :
                                                        <Feather
                                                            name="eye"
                                                            color="#4700b3"
                                                            size={17}
                                                        />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ color: 'grey', fontFamily: 'nunito-semi' }}>Both passwords must match.</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            <View style={{ marginTop: 30 }}>
                                <Pressable
                                    onPress={handleSubmit}
                                    android_ripple={{ color: '#fff' }}
                                    style={{
                                        borderRadius: 30,
                                        paddingVertical: 10,
                                        backgroundColor: '#4700b3'
                                    }} >
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{
                                            fontFamily: 'nunito-bold',
                                            fontSize: 20,
                                            color: '#fff'
                                        }}>Submit</Text>
                                    </View>

                                </Pressable>
                            </View>
                            <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }} >

                                <TouchableOpacity
                                    onPress={handleBack}
                                >
                                    <Text style={{ color: '#4700b3', fontFamily: 'nunito-bold' }}>Back</Text>
                                </TouchableOpacity>

                            </View>

                        </Animatable.View>
                    </View>



                </ScrollView>
            </Modal>
        )
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

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </Modal>
                {screen == "EmailChange" || screen == "PassChange" ?
                    display(screen)
                    :
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
                                    defaultValue={user.userData.emailID}
                                    editable={false}
                                />
                                <View style={{ marginLeft: 'auto', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => setScreen('EmailChange')}
                                    >
                                        <Text style={{ fontFamily:'nunito-semi',color: '#4700b3' }}>change</Text>
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
                                    <TouchableOpacity
                                        onPress={() => setScreen('PassChange')}
                                    >
                                        <Text style={{ fontFamily:'nunito-semi',color: '#4700b3' }}>change</Text>
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
                }
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
    textInputTitle: {
        fontFamily: 'nunito-semi',
        fontSize: 15,
        color: 'grey'
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