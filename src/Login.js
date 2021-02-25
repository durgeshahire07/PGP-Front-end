import React, { useContext } from 'react';
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
    SafeAreaView,
    ToastAndroid,
    Image,
    ImageBackground
} from 'react-native';
import { UserContext } from '../userContext';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {

    const user = useContext(UserContext);
    const [data, setData] = React.useState({
        userEmailId: '',
        password: '',

    });

    const [secureEntry, setSecureEntry] = React.useState({
        secureTextEntry: true
    })

    const textInput = (user) => {
        setData({
            ...data,
            userEmailId: user,
        });
    }

    const handlePasswordChange = (pass) => {
        setData({
            ...data,
            password: pass
        });
    }

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }

    async function submitHandler() {
        if (data.userEmailId && data.password) {
            try {
                var config = {
                    method: 'post',
                    url: 'http://192.168.43.19:3000/api/v1/auth/login',
                    headers: {},
                    data: data
                };
                const response = await axios(config)
                console.log(response)
                if (response.data.success) {
                    user.setUserData({
                        emailID: response.data.data.userEmailId,
                        firstName: response.data.data.firstName,
                        lastName: response.data.data.lastName,
                        userID: response.data.data._id
                    })
                    navigation.navigate('Home')
                }
                else {
                    ToastAndroid.show("Incorrect email id or password!",
                        ToastAndroid.LONG)
                }
            } catch (error) {
                console.log(error)
                if (error.response.status === 404) {
                    ToastAndroid.show("User not found!",
                        ToastAndroid.SHORT)
                } else if (error.response.status === 500) {
                    ToastAndroid.show("Oops...something went wrong!",
                        ToastAndroid.LONG)
                }
                else {
                    ToastAndroid.show(error,
                        ToastAndroid.SHORT)
                }
            }
        }
        else {
            ToastAndroid.show("Please fill the Required fields!",
                ToastAndroid.SHORT)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
           
            <StatusBar backgroundColor='#3d0099' barStyle="light-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <LinearGradient
                 style={{ flex: 1 }}
                 colors={['#4700b3', '#a366ff']}
                >
                
                <View style={styles.header} />
                
                <View style={{alignItems:'center',paddingVertical:40}}>
                <Image
                        source={require('../assets/icons/password.png')}
                        style={{  height: 100, width: 100, }}

                    />
                    </View>
                   
                <Animatable.View
                    style={styles.footer}
                >
                    <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 28,
                        color: '#4700b3',
                    }}>Hello There!</Text>
                    <Text style={{
                        fontFamily: 'nunito-semi',
                        fontSize: 18,
                        paddingBottom: 10,
                        color: 'grey',
                    }}>Login to continue</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Email Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(user) => textInput(user)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={secureEntry.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(pass) => handlePasswordChange(pass)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {secureEntry.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="#a6a6a6"
                                    size={17}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="#8533ff"
                                    size={17}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <TouchableOpacity
                            onPress={() => navigation.push('ForgotPass')}
                        >
                            <Text style={[{ fontFamily: 'nunito-bold' }, { color: '#4700b3' }]}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <View
                            style={styles.signIn}
                            
                        >
                             <LinearGradient
                                     colors={['#8533ff', '#4700b3']}
                                     start={[1,0]}
                                    style={styles.signIn}
                                >
                                    <TouchableOpacity
                                    onPress={submitHandler}
                                    >

                                    
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Login</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={styles.textPrivate}>
                            <Text style={[{ fontFamily: 'nunito-semi' }, { color: 'grey' }]}>
                                Don't have an Account?
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={[{ fontFamily: 'nunito-bold' }, { color: '#4700b3' }]}>{" "}Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
               
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4700b3'
    },
    safeArea: {
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
        paddingHorizontal: '3%',
        backgroundColor: '#4700b3'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomColor: '#c299ff',
        borderBottomWidth: 2,
    },
    textInput: {
        flex: 1,
        fontFamily: 'nunito-regular',
        color: '#000000',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 10,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 7,
    },
    textSign: {
        fontFamily: 'nunito-bold',
        fontSize: 20,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
});