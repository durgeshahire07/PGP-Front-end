import React, { useContext, useEffect } from 'react'
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

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'



import { UserContext } from '../userContext'
import { useState } from 'react/cjs/react.development';

const resetPass = () => {

    const user = useContext(UserContext);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        userID: user.userData.userID,
        password: ''
    })

    const [secureEntry, setSecureEntry] = React.useState({
        secureTextEntry: true
    })

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }


    const inputChange = (pass) =>{
        setData({
            ...data,
            password: pass
        })
    }

    async function handleSubmit() {
        if(data.password==''){
            ToastAndroid.show("Please enter your password!",
                    ToastAndroid.LONG)
        }
        else{
            setLoading(true);
            try {
                var config = {
                    method: 'post',
                    url: 'http://192.168.43.19:3000/api/v1/auth/checkPassword',
                    headers: {},
                    data: data
                };
                const response = await axios(config)
                console.log(response)
                if (response.data.success) {
                    setLoading(false)
                    ToastAndroid.show("success",
                        ToastAndroid.LONG)
                }
                else {
                    setLoading(false)
                    ToastAndroid.show("Wrong password entered!",
                        ToastAndroid.LONG)
    
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                ToastAndroid.show(error,
                    ToastAndroid.LONG)
    
            }
        }
        
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <Modal transparent={true} visible={loading} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
           
            <View style={{ flex: 1, paddingHorizontal: 20,paddingVertical:20 }}>
            <View style={{paddingVertical:10}}>
                <Text
                style={{
                    fontFamily:'nunito-bold',
                    fontSize:30
                }}
                >Change Email id</Text>
            </View>
            <View>
                <Text
                 style={{
                     fontFamily:'nunito-semi',
                     fontSize:15,
                     color:'grey'
                 }}
                >Enter your password to change your email id</Text>
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
                        <View style={{width:'90%'}}>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={secureEntry.secureTextEntry ? true : false}
                            onChangeText={(value) => inputChange(value)}
                        />
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
                                    color="#000000"
                                    size={17}
                                />
                            }
                            </TouchableOpacity>  
                        </View>

                    </View>
                </View>
                

                
                    <View style={{ alignItems: 'center' }}>

                        <View style={{ paddingVertical: 10, paddingTop: 20 }}>

                            <Pressable 
                                onPress={handleSubmit}
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
                                }}>Submit</Text>

                            </Pressable>

                        </View>
                    </View>
                   
            </View>


        </ScrollView>
    </SafeAreaView>
    )
}

export default resetPass;

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