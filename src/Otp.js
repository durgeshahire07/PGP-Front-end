import React,{useRef,useEffect, useState} from 'react';
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
    Keyboard,
    RefreshControl
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';

import axios from 'axios'



const Otp = ({ route, navigation }) => {

    const { UserId } = route.params;
    // const id = JSON.stringify(UserId)
    console.log(UserId)
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
   
    async function submitHandler () {
        const otp = '' + pin1 + pin2 + pin3 + pin4 ;
        // console.log(id)
        console.log(otp)
        try{
          var config = {
              method: 'post',
              url: 'http://127.0.0.1:3000/api/v2/auth/otp',
              headers: { },
              data : {id:UserId,otp}
            };
            const key = await axios(config)
            const response = key
            console.log(response)
            if(response.data.success){
              navigation.push('NewPass', {UserId})
           }
          else{
              alert("Invalid code")
          }
          }catch(error){
            console.log(error)
            if (error.response.status == 404) {
              alert("User not found")
          } else if (error.response.status === 500) {
              alert("Opps something went wrong")
          }
          else if (error.response.status === 400) {
              alert("Wrong OTP code entered")
          }
          }
        
     
 }
    


    return (

        
        <View style={styles.container}>
<ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <StatusBar backgroundColor='#4700b3' barStyle="light-content" />


            <View style={styles.header} />
            <Animatable.View
                animation="fadeInUp"
                style={styles.footer}
            >
                <Text style={{
                    fontFamily: 'nunito-bold',
                    fontSize: 28,
                    color: '#4700b3',



                }}>Verification Code</Text>
                <Text style={{
                    fontFamily: 'nunito-semi',
                    fontSize: 15,
                    paddingBottom: 30,
                    color: 'grey',

                }}>Enter the OTP code sent to your email</Text>

                <View style={styles.containerInput}>

                    <TextInput
                    ref={pin1Ref}
                    onChangeText={(pin1)=> { 
                        setPin({...pin,pin1:pin1})
                         if(pin1!=''){
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
                    onChangeText={(pin2)=> {
                        setPin({ ...pin,pin2:pin2})
                        if(pin2!=''){
                            pin3Ref.current.focus()
                            
                         } 
                         
                    }}
                    value={pin2}
                        keyboardType="numeric" 
                        maxLength={1}
                        style={styles.cellInput}
                    ></TextInput>


                    <TextInput 
                     ref={pin3Ref}
                    onChangeText={(pin3)=> {
                        setPin({...pin,pin3:pin3})
                        
                        if(pin3!=''){
                            
                            pin4Ref.current.focus()
                         } 
                    }}
                    value={pin3}
                        keyboardType="numeric" 
                        maxLength={1}
                        style={styles.cellInput}
                    ></TextInput>

                    <TextInput 
                     ref={pin4Ref}
                     
                    onChangeText={(pin4)=>{
                        
                    setPin({...pin,pin4:pin4})

                    }}
                   
                    value={pin4}
                        keyboardType="numeric" 
                        maxLength={1}
                        style={styles.cellInput}
                    ></TextInput>

                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={submitHandler}
                        // onPress={() => navigation.navigate('NewPass')}
                    >
                        <LinearGradient
                            colors={['#4700b3', '#4700b3']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff',
                            }]}>Verify</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.textPrivate}>
                    <Text style={[{ fontFamily: 'nunito-semi' }, { color: 'grey' }]}>
                        Didn't get code?
                </Text>
                    <TouchableOpacity>
                        <Text style={[{ fontFamily: 'nunito-bold' }, { color: '#4700b3' }]}>{" "}Resend OTP</Text>
                    </TouchableOpacity>
                    
                </View>

            </Animatable.View>
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

    header: {
        flex: 5,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
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