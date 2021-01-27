import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
    Image

} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'


const ForgotPass = ({ navigation }) => {

    const [data, setData] = React.useState({
        userEmailId: ''
    });

    const handleInputChange = (email) => {
        setData({
            ...data,
            userEmailId: email
        });
    }

    const [loading, setLoading] = React.useState({
        isLoading: false
    })

    if (loading.isLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>)
    }

    async function submitHandler() {
        setLoading({
            ...loading,
            isLoading: true
        })
        
        console.log(data)
        try {
            var config = {
                method: 'get',
                url: `http://192.168.43.19:3000/api/v1/auth/otp?email=${data.userEmailId}`,
                headers: {}
            };
            const response = await axios(config)
            console.log(response)
            if (response.data.success) {
                setLoading({
                    isLoading: false
                })
                navigation.push('Otp', {
                    UserId: response.data.data.id,
                })
            }
            else {
                setLoading({
                    isLoading: false
                })
                console.log("invalid email")
                alert("Invalid User")
            }
        } catch (error) {
            console.log(error)
            if (error.response.status === 404) {
                alert("User not found")
                setLoading({
                    isLoading: false
                })
            } else if (error.response.status === 500) {
                alert("Opps something went wrong")
                setLoading({
                    isLoading: false
                })
            }
        }

    }

    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                <StatusBar backgroundColor='#4700b3' barStyle="light-content" />
                <Animatable.View
                // animation="slideInUp" 
                style={{flex:1,justifyContent:"center",alignItems:"center"}}
                >
                    <Image
                        source={require('../assets/icons/f-p.png')}
                        style={{height:190 , width:200,}}

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
                    }}>Forgot Password?</Text>

                    <Text style={{
                        fontFamily: 'nunito-regular',
                        fontSize: 15,
                        color: 'grey',
                        paddingBottom: 20
                    }}>To recover your password, you need to enter your
                        registered email address. We'll send the recovery
                        code to your email</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Email Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(email) => handleInputChange(email)}
                        />
                    </View>


                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            // onPress={() => navigation.push('Otp')}
                            onPress={submitHandler}
                        >
                            <LinearGradient
                                colors={['#4700b3', '#4700b3']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Get OTP</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.textPrivate}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={[{ fontFamily: 'nunito-bold' }, { color: '#4700b3' }]}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Animatable.View>

            </ScrollView>
        </View>




    );
};

export default ForgotPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4700b3',
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
        borderBottomColor: '#b380ff',
        borderBottomWidth: 2,
    },
    textInput: {
        flex: 1,
        fontFamily: 'nunito-regular',
        color: '#000000'
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
});