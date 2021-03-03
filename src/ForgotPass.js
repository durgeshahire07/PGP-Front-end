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
    Image,
    ToastAndroid,
    Modal

} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useState } from 'react/cjs/react.development';


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

    const [loading,setLoading] = useState(false);

    // if (loading.isLoading) {
    //     return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <ActivityIndicator size="large" color="#0000ff" />
    //     </View>)
    // }

    async function submitHandler() {
        // setLoading({
        //     ...loading,
        //     isLoading: true
        // })

        console.log(data)
        if (data.userEmailId) {
            setLoading(true);
            try {
                var config = {
                    method: 'get',
                    url: `http://192.168.43.19:3000/api/v1/auth/otp?email=${data.userEmailId}`,
                    headers: {}
                };
                const response = await axios(config)
                console.log(response)
                if (response.data.success) {
                   setLoading(false)
                    navigation.push('Otp', {
                        UserId: response.data.data.id,
                    })
                }
                else {
                    setLoading(false)
                    console.log("invalid email")
                    ToastAndroid.show("Invalid email!",
                    ToastAndroid.LONG)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                if (error.response.status === 500) {
                    ToastAndroid.show("Oops...something went wrong!",
                    ToastAndroid.LONG)
                    
                }
                else if(error.response.status === 404){
                    ToastAndroid.show("User not found",
                    ToastAndroid.LONG)
                }
                else{
                    ToastAndroid.show(error,
                    ToastAndroid.LONG)
                }
            }
        }
        else {
            ToastAndroid.show("Please enter your email id",
            ToastAndroid.SHORT)
        }

    }

    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <StatusBar backgroundColor='#3d0099' barStyle="light-content" />
                <Modal transparent={true} visible={loading} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#000000aa'}}>
                       
                    <Image style={{ width: 100, height: 100 }} source={require('../assets/gif/test.gif')} />
                        
                    </View>
                </Modal>
                <LinearGradient
                 style={{ flex: 1 }}
                 colors={['#4700b3', '#a366ff']}
                >
                <Animatable.View
                    // animation="slideInUp" 
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Image
                        source={require('../assets/icons/forgot.png')}
                        style={{ height: 120, width: 120, }}

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
                            keyboardType="email-address"
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
                                colors={['#8533ff', '#4700b3']}
                                start={[1, 0]}
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
                </LinearGradient>
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