import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
    ToastAndroid,
    Modal,
    Image,
    ActivityIndicator
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'

const Otp = ({ route, navigation }) => {

    const { UserId } = route.params;
    const [loading, setLoading] = useState(false)
    // console.log(UserId)
    const pin1Ref = React.useRef()
    const pin2Ref = React.useRef()
    const pin3Ref = React.useRef()
    const pin4Ref = React.useRef()
    const [pin, setPin] = React.useState({
        pin1: '',
        pin2: '',
        pin3: '',
        pin4: ''
    });

    const { pin1, pin2, pin3, pin4 } = pin

    async function submitHandler() {
        const otp = '' + pin1 + pin2 + pin3 + pin4;
        console.log(otp)
        if (pin1 && pin2 && pin3 && pin4) {
            setLoading(true)
            try {
                var config = {
                    method: 'post',
                    url: 'http://192.168.43.19:3000/api/v1/auth/otp',
                    headers: {},
                    data: { id: UserId, otp }
                };
                const response = await axios(config)
                console.log(response)
                if (response.data.success) {
                    setLoading(false)
                    navigation.replace('NewPass', { UserId })
                }
                else {
                    setLoading(false)
                    ToastAndroid.show("Invalid Code!",
                        ToastAndroid.SHORT)
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                if (error.response.status === 500) {
                    ToastAndroid.show("Oops...something went wrong!",
                        ToastAndroid.SHORT)
                }
                else if (error.response.status === 400) {
                    ToastAndroid.show("Invalid Code!",
                        ToastAndroid.SHORT)
                }
                else {
                    ToastAndroid.show("Oops...something went wrong!",
                        ToastAndroid.SHORT)
                }
            }
        }
        else {

            ToastAndroid.show("Please complete the otp!",
                ToastAndroid.LONG)

        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <StatusBar backgroundColor='#3d0099' barStyle="light-content" />
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
                        source={require('../assets/icons/otp-final.png')}
                        style={{ height: 110, width: 110 }}

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
                    }}>Verification Code</Text>
                    <Text style={{
                        fontFamily: 'nunito-regular',
                        fontSize: 15,
                        color: 'grey',
                        paddingBottom: 20
                    }}>Enter the OTP code sent to your email</Text>
                    <View style={styles.containerInput}>
                        <TextInput
                            ref={pin1Ref}
                            onChangeText={(pin1) => {
                                setPin({ ...pin, pin1: pin1 })
                                if (pin1 != '') {
                                    pin2Ref.current.focus()
                                }
                            }}
                            value={pin1}
                            keyboardType="numeric"
                            maxLength={1}
                            style={styles.cellInput}
                        />
                        <TextInput
                            ref={pin2Ref}
                            onChangeText={(pin2) => {
                                setPin({ ...pin, pin2: pin2 })
                                if (pin2 != '') {
                                    pin3Ref.current.focus()
                                }
                            }}
                            value={pin2}
                            keyboardType="numeric"
                            maxLength={1}
                            style={styles.cellInput}>
                        </TextInput>
                        <TextInput
                            ref={pin3Ref}
                            onChangeText={(pin3) => {
                                setPin({ ...pin, pin3: pin3 })
                                if (pin3 != '') {
                                    pin4Ref.current.focus()
                                }
                            }}
                            value={pin3}
                            keyboardType="numeric"
                            maxLength={1}
                            style={styles.cellInput}>
                        </TextInput>
                        <TextInput
                            ref={pin4Ref}
                            onChangeText={(pin4) => {
                                setPin({ ...pin, pin4: pin4 })
                            }}
                            value={pin4}
                            keyboardType="numeric"
                            maxLength={1}
                            style={styles.cellInput}>
                        </TextInput>
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
                                }]}>Verify</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={
                            [{ fontFamily: 'nunito-semi' },
                            { color: 'grey' }]}>
                            Didn't get code?
                        </Text>
                        <TouchableOpacity >
                            {/* onPress={onResendOTP} */}
                            <Text style={[
                                { fontFamily: 'nunito-bold' },
                                // { color: enableResend ? '#4700b3' : 'grey' }
                                { color: '#4700b3' }]}
                            // >{" "}Resend OTP({countdown})</Text>
                            >{" "}Resend OTP</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
               </LinearGradient>
            </ScrollView>
        </View>
    );
};

export default Otp;

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
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomColor: '#4700b3',
        borderBottomWidth: 2,
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
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    cellInput: {
        textAlign: "center",
        fontSize: 25,
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#4700b3'
    }
});