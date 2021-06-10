import React, { useContext,useState } from 'react';
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
    ActivityIndicator,
    ToastAndroid,
    SafeAreaView,
    Modal,
    Image,
    Pressable
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import { UserContext } from '../userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'
import {Picker} from '@react-native-picker/picker';
const userInfo = ({navigation,route}) => {
    const { UserId } = route.params;
    console.log(UserId)
    const {HOST,ADD_INFO} = config; 
    const { data } = route.params;
    const [selectedAge, setSelectedAge] = useState('0');
    const [selectedProfession, setSelectedProfession] = useState('student');
    const [picker, setPicker] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const professionChange = (value) => {
        if(value==="others"){
            setSelectedProfession('');
            setPicker(false);
            
        }
        else{
            setSelectedProfession(value);
            
        }
    }

    const textInputProfession = (text) => {
        setSelectedProfession(text);
    }

    async function submitHandler() {
        console.log(selectedProfession);
        if(selectedProfession===""){
            ToastAndroid.show("Please Enter your Profession!",
            ToastAndroid.SHORT)
        }
        else if(selectedAge==="0"){
            ToastAndroid.show("Please Select your Age Group!",
            ToastAndroid.SHORT)
        }
        else{
            setIsLoading(true);
           
             console.log(data);
                    try {
                        var config = {
                            method: 'post',
                            url: 'http://192.168.43.19:3000/api/v1/auth/additionalInfo',
                            headers: {},
                            data: {
                                userID: UserId,
                                ageGroupLevel: selectedAge,
                                profession: selectedProfession
                             }
                        };
                        const response = await axios(config)
                        if (response.data.success) {
                          
                           setIsLoading(false);
                           navigation.navigate('App', { screen: 'Home' })
                            // await AsyncStorage.setItem('userProfile', JSON.stringify({
                            //  firstName: response.data.data.firstName,
                            //      emailID: response.data.data.userEmailId,
                            //       lastName: response.data.data.lastName,
                            //     userID: response.data.data._id,
                            //     token: '1'
                            // }));
                            
                            // setSecureEntry({
                            //     ...secureEntry,
                            //     isLoading: false
                            // })
                            // navigation.navigate('App', { screen: 'Home' })
                        }
                        else {
                            setIsLoading(false);
                            // setSecureEntry({
                            //     ...secureEntry,
                            //     isLoading: false
                            // })
                            ToastAndroid.show("Something went wrong!",
                                ToastAndroid.SHORT)
                        }
                    } catch (error) {
                        setIsLoading(false);
                        // setSecureEntry({
                        //     ...secureEntry,
                        //     isLoading: false
                        // })
                        console.log(error)
                        if (error.response.status === 404) {
                            ToastAndroid.show("User not found!",
                                ToastAndroid.SHORT)
                        } else if (error.response.status === 500) {
                            ToastAndroid.show("Oops...something went wrong!",
                                ToastAndroid.SHORT)
                        }
                        else if (error.response.status === 503) {
                            ToastAndroid.show("Internal Server Error! Please try after sometime.",
                                ToastAndroid.SHORT)
                        }
                        else {
                            ToastAndroid.show("error",
                                ToastAndroid.SHORT)
                        }
                    }
                
               
                
            
            
            
            
        }
        
    }
    // console.log(selectedAge);
    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#3d0099' barStyle="light-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <Modal transparent={true} visible={isLoading} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                        <Image style={{ width: 100, height: 100 }} source={require('../assets/gif/new.gif')} />
                    </View>
                </Modal>
                <View style={styles.header}>
                </View>
                <View style={styles.footer}>
                <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 25,
                        color: '#4700b3',
                    }}>Tell us something more about you!</Text>
                    <Text style={{
                        fontFamily: 'nunito-regular',
                        fontSize: 15,
                        paddingVertical: 10,
                        color: 'grey',
                    }}>This information will help us to analyse more about you for calculating your personal growth.</Text>

                    <View style={{flexDirection: 'row',paddingVertical:10,width:200}} >
                        <Text  style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 15,
                        paddingVertical: 10,
                        color: 'grey',
                    }}>Your occupation : </Text>
                    {
                    picker ? 
                    <Picker
                    prompt={'Select your occupation'}
                    
                         style={styles.picker}
                         onValueChange={(itemValue, itemIndex)=> professionChange(itemValue)}
                        >
                            <Picker.Item label="Student" value="Student"></Picker.Item>
                            <Picker.Item label="Healthcare and medicine" value="healthcare and medicine"></Picker.Item>
                            <Picker.Item label="Arts and entertainment" value="arts and entertainment"></Picker.Item>
                            <Picker.Item label="Business administration" value="business administration"></Picker.Item>
                            <Picker.Item label="Industrial and manufacturing" value="industrial and manufacturing"></Picker.Item>
                            <Picker.Item label="Law enforcement and armed forces" value="law enforcement and armed forces"></Picker.Item>
                            <Picker.Item label="Science and technology" value="science and technology"></Picker.Item>
                            <Picker.Item label="Others" value="others"></Picker.Item>
                        
                        </Picker>
                        : 

                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter your Profession"
                                style={styles.textInput}
                                onChangeText={(text) => textInputProfession(text)}
                            />
                        </View>
                        
                        }
                       
                    </View>

                    <View style={{flexDirection: 'row',paddingVertical:10}} >
                        <Text  style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 15,
                        paddingVertical: 10,
                        color: 'grey',
                    }}>Your Age Group : </Text>
                        <Picker
                        mode={'dropdown'}
                         style={styles.picker}
                         onValueChange={(itemValue, itemIndex)=> setSelectedAge(itemValue)}
                        >
                            <Picker.Item label="Select your age group" value="0"></Picker.Item>
                            <Picker.Item label="Below 15" value={1}></Picker.Item>
                            <Picker.Item label="15 - 25" value={2}></Picker.Item>
                            <Picker.Item label="25 - 40" value={3}></Picker.Item>
                            <Picker.Item label="Above 40" value={4}></Picker.Item>
                        </Picker>
                    </View>

                    <View style={styles.bottomContainer}>
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
                                }]}>Continue</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>

                        <View style={styles.textPrivate}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={[{ fontFamily: 'nunito-bold' }, { color: '#4700b3' }]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default userInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4700b3'
    },
    picker: {
        width: 220,
        height: 42,
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 0.2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    textSign: {
        fontFamily: 'nunito-bold',
        fontSize: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 7,
    },
    bottomContainer: {
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 10,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    textInput: {
        fontFamily: 'nunito-regular',
        color: '#000000',
        paddingTop:8,
        paddingLeft:5,
        width:200,
    },
    action: {
        borderBottomColor: '#c299ff',
        borderBottomWidth: 2,
        width: 200,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    
});