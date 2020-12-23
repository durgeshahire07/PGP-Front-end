import React from 'react';
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
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'

const NewPass = ({ route, navigation }) => {

    const { UserId } = route.params;
    // const id = JSON.stringify(UserId)
    console.log(UserId)
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

        if (secureEntry.confirm_password != data.password) {
            alert("Password don't match")
        }
        else {
            try {
                var config = {
                    method: 'patch',
                    url: 'http://192.168.43.19:3000/api/v1/auth/password',
                    headers: {},
                    data: { id: UserId, password: data.password } //id
                };
                const response = await axios(config)
                console.log(response)
                if (response.data.success) {
                    navigation.push('Login')
                }
            } catch (error) {
                console.log(error)
                  if (error.response.status == 404) {
                    alert("User not found")
                } else if (error.response.status === 500) {
                    alert("Opps something went wrong")
                }
            }
        }
    }

    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#4700b3' barStyle="light-content" />
                <View style={styles.header} />

                <Animatable.View
                    animation="fadeInUp"
                    style={styles.footer}
                >
                    <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 28,
                        color: '#blue',
                        color: '#4700b3'
                    }}>Reset Password</Text>
                    <Text style={{
                        fontFamily: 'nunito-semi',
                        fontSize: 18,
                        paddingBottom: 10,
                        color: 'grey'
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
                                colors={['#4700b3', '#4700b3']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Reset Password</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </Animatable.View>
            </ScrollView>
        </View>

    );
};

export default NewPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4700b3'
    },
    header: {
        flex: 1,
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
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomColor: '#4700b3',
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