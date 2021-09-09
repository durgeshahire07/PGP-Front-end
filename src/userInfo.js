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
    const [selectedOccupation, setSelectedOccupation] = useState('student');
    const [selectedProfession, setSelectedProfession] = useState('student');
    const [picker, setPicker] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const OccupationChange = (value) => {
        console.log(selectedOccupation)
        if(value==="others"){
            setSelectedOccupation('');
            setPicker(false);
            
        }
        else{
            setSelectedOccupation(value);
            
        }
    }
    const ProfessionChange = (value) => {
    
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
        console.log(selectedOccupation);
        if(selectedOccupation===""||selectedProfession==""){
            ToastAndroid.show("Please fill out all the information!",
            ToastAndroid.SHORT)
        }
        else if(selectedAge==="0"){
            ToastAndroid.show("Please Select your Age Group!",
            ToastAndroid.SHORT)
        }
        else{
            setIsLoading(true);
           
                    try {
                        var config = {
                            method: 'post',
                            // url: 'http://192.168.43.19:3000/api/v1/auth/additionalInfo',
                            url: `${HOST}${ADD_INFO}`,
                            headers: {},
                            data: {
                                userID: UserId,
                                ageGroupLevel: selectedAge,
                                occupation: selectedOccupation,
                                profession: selectedProfession
                             }
                        };
                        console.log(data);
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
                     <Picker
                    prompt={'Select your Occupation'}
                    
                         style={styles.picker}
                         onValueChange={(itemValue, itemIndex)=> OccupationChange(itemValue)}
                        >
                            <Picker.Item label="Student" value="student"></Picker.Item>
                            <Picker.Item label="Healthcare and medicine" value="healthcare and medicine"></Picker.Item>
                            <Picker.Item label="Arts and entertainment" value="arts and entertainment"></Picker.Item>
                            <Picker.Item label="Business administration" value="business administration"></Picker.Item>
                            <Picker.Item label="Industrial and manufacturing" value="industrial and manufacturing"></Picker.Item>
                            <Picker.Item label="Law enforcement and armed forces" value="law enforcement and armed forces"></Picker.Item>
                            <Picker.Item label="Science and technology" value="science and technology"></Picker.Item>
                           
                        
                        </Picker>
                     
                     
                        </View>
                        <View style={{flexDirection: 'row',paddingVertical:10,width:200}} >
                        <Text  style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 15,
                        paddingVertical: 10,
                        color: 'grey',
                    }}>Your Profession : </Text>
                    
                    
                        {
                            picker ?
                            (() => {
                                if (selectedOccupation=="student")
                                   return <Picker
                                   prompt={'Select your Category'}
                                   
                                        style={styles.picker}
                                        onValueChange={(itemValue, itemIndex)=> ProfessionChange(itemValue)}
                                       >
                                           <Picker.Item label="High School" value="healthcare and medicine"></Picker.Item>
                                           <Picker.Item label="Undergraduate" value="arts and entertainment"></Picker.Item>
                                           <Picker.Item label="Postgraduate" value="business administration"></Picker.Item>
                                           <Picker.Item label="others" value="others"></Picker.Item>
                                       </Picker>
                                else if(selectedOccupation=="healthcare and medicine")
                                return <Picker
                                prompt={'Select your Profession'}
                                
                                     style={styles.picker}
                                     onValueChange={(itemValue, itemIndex)=> ProfessionChange(itemValue)}
                                    >
                                        <Picker.Item label="Medical Student" value="healthcare and medicine"></Picker.Item>
                                        <Picker.Item label="Doctor" value="healthcare and medicine"></Picker.Item>
                                        <Picker.Item label="Nurse" value="arts and entertainment"></Picker.Item>
                                        <Picker.Item label="Scientific Support" value="business administration"></Picker.Item>
                                        <Picker.Item label="Management Technology and Business Support" value="business administration"></Picker.Item>
                                        <Picker.Item label="others" value="others"></Picker.Item>
                                    
                                    </Picker>
                                else if(selectedOccupation=="arts and entertainment")
                                return <Picker
                                prompt={'Select your Profession'}
                                
                                     style={styles.picker}
                                     onValueChange={(itemValue, itemIndex)=> ProfessionChange(itemValue)}
                                    >
                                        <Picker.Item label="Multimedia Specialist" value="Multimedia Specialist"></Picker.Item>
                                        <Picker.Item label="Film Director" value="Film Director"></Picker.Item>
                                        <Picker.Item label="Product Designer" value="Product Designer"></Picker.Item>
                                        <Picker.Item label="Art Director/Teacher" value="business administration"></Picker.Item>
                                        <Picker.Item label="Illustrator" value="business administration"></Picker.Item>
                                        <Picker.Item label="others" value="others"></Picker.Item>
                                    
                                    </Picker>
                                else if(selectedOccupation=="business administration")
                                return <Picker
                                prompt={'Select your Profession'}
                                
                                     style={styles.picker}
                                     onValueChange={(itemValue, itemIndex)=> ProfessionChange(itemValue)}
                                    >
                                        <Picker.Item label="BBA/BSABA Student" value="BBA/BSABA Student"></Picker.Item>
                                        <Picker.Item label="Accountant" value="Accountantt"></Picker.Item>
                                        <Picker.Item label="Management Consultant" value="Management Consultant"></Picker.Item>
                                        <Picker.Item label="Finance Manager" value="Finance Manager"></Picker.Item>
                                        <Picker.Item label="Illustrator" value="Illustrator"></Picker.Item>
                                        <Picker.Item label="others" value="others"></Picker.Item>
                                    
                                    </Picker>
                              
                            })()
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
                            <Picker.Item label="15 - 20" value={2}></Picker.Item>
                            <Picker.Item label="20 - 30" value={3}></Picker.Item>
                            <Picker.Item label="30 - 40" value={4}></Picker.Item>
                            <Picker.Item label="Above 40" value={5}></Picker.Item>
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