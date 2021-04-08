import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    StatusBar,
    Modal,
    Image,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
import { useState } from 'react/cjs/react.development';
import config from '../config'
const NewPass = ({ route, navigation }) => {
    const resetPass_URL = config.RESET_PASS
    const { UserId } = route.params;
    // const id = JSON.stringify(UserId)
    // console.log(UserId)
    const [loading, setLoading] = useState(false)
    const [data, setData] = React.useState({
        password: '',
    });

    const [secureEntry, setSecureEntry] = React.useState({
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        confirm_password: ''
    })

    const handlePasswordChange = (pass1) => {
        setData({
            ...data,
            password: pass1
        });
    }

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }

    const handleConfirmPasswordChange = (pass2) => {
        setSecureEntry({
            ...secureEntry,
            confirm_password: pass2
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            confirm_secureTextEntry: !secureEntry.confirm_secureTextEntry
        });
    }

    async function submitHandler() {
        console.log(data)
        if (secureEntry.confirm_password && data.password) {
            if (secureEntry.confirm_password != data.password) {
                ToastAndroid.show("Passwords don't match!",
                    ToastAndroid.SHORT)
            }
            else if (data.password.length > 5) {
                setLoading(true)
                try {
                    var config = {
                        method: 'patch',
                        url: resetPass_URL,
                        headers: {},
                        data: {
                            userID: UserId,
                            password: data.password
                        }
                    };
                    const response = await axios(config)
                    console.log(response)
                    if (response.data.success) {
                        navigation.replace('Login')
                        ToastAndroid.show("Password successfully updated 👍",
                            ToastAndroid.SHORT)
                        
                        setLoading(false)
                    }
                } catch (error) {
                    setLoading(false)
                    console.log(error)
                    if (error.response.status === 500) {
                        ToastAndroid.show("Oops...something went wrong!",
                            ToastAndroid.SHORT)
                    }
                    else {
                        ToastAndroid.show("Oops...something went wrong!",
                            ToastAndroid.SHORT)
                    }
                }
            }
            else {
                ToastAndroid.show("Password must have at least 6 characters!",
                    ToastAndroid.SHORT)
            }
        }
        else {
            ToastAndroid.show("Please enter all the information!",
                ToastAndroid.SHORT)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#4700b3' barStyle="light-content" />
                <Modal transparent={true} visible={loading} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>

                    <Image style={{ width: 100, height: 100 }} source={require('../assets/gif/new.gif')} />

                    </View>
                </Modal>
                
                <LinearGradient
                 style={{ flex: 1 }}
                 colors={['#4700b3', '#a366ff']}
                >
                 <Animatable.View
                    // animation="bounceIn" 
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Image
                        source={require('../assets/icons/settings.png')}
                        style={{ height: 100, width: 100 }}

                    />
                </Animatable.View>
                <Animatable.View
                    // animation="fadeInUp"
                    style={styles.footer}
                >
                    <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 28,
                        color: '#4700b3',
                        paddingBottom: 5
                    }}>Reset Password</Text>
                    <Text style={{
                        fontFamily: 'nunito-regular',
                        fontSize: 15,
                        color: 'grey',
                        paddingBottom: 20
                    }}>Please enter your new password</Text>
                    
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your New Password"
                            secureTextEntry={secureEntry.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(pass1) => handlePasswordChange(pass1)}
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
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Confirm Your New Password"
                            style={styles.textInput}
                            secureTextEntry={secureEntry.confirm_secureTextEntry ? true : false}
                            autoCapitalize="none"
                            onChangeText={(pass2) => handleConfirmPasswordChange(pass2)}
                        />
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
                                    color="#8533ff"
                                    size={17}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={submitHandler}
                        >
                            <LinearGradient
                                 colors={['#8533ff', '#4700b3']}
                                 start={[1, 0]}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Reset Password</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4700b3'
    },
   
    footer: {
        flex: 0.2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: '#000',
        elevation: 6,
    },
    textSign: {
        fontSize: 18,
        fontFamily: 'nunito-bold'
    }

});