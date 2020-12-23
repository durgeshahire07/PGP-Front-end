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
    StatusBar,
    SafeAreaView,

} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton, State } from 'react-native-gesture-handler';
import axios from 'axios'
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';

const Daily = () => {
    const [checkChoice, setCheckChoice] = React.useState({
        choice1: false,
        choice2: false,
        choice3: false,
        choice4: false,
    })

    const updateCheckChoice1 = () => {
        setCheckChoice({
            choice1: !checkChoice.choice1
        })
    }
    const updateCheckChoice2 = () => {
        setCheckChoice({
            choice2: !checkChoice.choice2
        })
    }
    const updateCheckChoice3 = () => {
        setCheckChoice({
            choice3: !checkChoice.choice3
        })
    }
    const updateCheckChoice4 = () => {
        setCheckChoice({
            choice4: !checkChoice.choice4
        })
    }

    const [checkbox, setCheckbox] = React.useState({
        tick1: false,
    })

    const [checkbox2, setCheckbox2] = React.useState({
        tick2: false
    })
    const [checkbox3, setCheckbox3] = React.useState({
        tick3: false
    })
    const [checkbox4, setCheckbox4] = React.useState({
        tick4: false
    })
    const updateCheckbox1 = () => {
        setCheckbox({
            tick1: !checkbox.tick1
        })
    }
    const updateCheckbox2 = () => {
        setCheckbox2({
            tick2: !checkbox2.tick2
        })
    }
    const updateCheckbox3 = () => {
        setCheckbox3({
            tick3: !checkbox3.tick3
        })
    }
    const updateCheckbox4 = () => {
        setCheckbox4({
            tick4: !checkbox4.tick4
        })
    }
    
        // try {
        //     var config = {
        //         method: 'get',
        //         url: 'http://192.168.43.19:3000/api/v1/auth/getDailySurvey',
        //         headers: {}
        //     };

        //     const response = axios(config)
        //     console.log(response)
        //     if (response.success) {
        //        console.log("success")
        //     }
        //     else {
        //         alert("Something went wrong")
        //     }
        // }
        // catch (error) {
        //     console.log(error)

        // }
   

    var config = {
        method: 'get',
        url: 'http://192.168.43.19:3000/api/v1/auth/getDailySurvey',
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if(response.data.success){
            const myObj = response.data.data
        }
        else{
            alert("Oops..something went wrong")
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    return (

        
        
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={{ paddingTop: 13 }}>
                    <TouchableOpacity>
                        <Feather
                            name="arrow-left"
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{
                    fontFamily: 'nunito-semi',
                    fontSize: 20,
                    color: '#fff',
                    paddingLeft: 10,
                    paddingTop: 10
                }}>Daily Personal Growth Planner</Text>

            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#4700b3' barStyle="light-content" />

                <View style={styles.container}>

                    <Text style={{
                        fontFamily: 'nunito-semi',
                        fontSize: 15,
                        color: '#a6a6a6',
                        textAlign: 'center',
                        paddingTop: 15,
                        paddingBottom: 10
                    }}>17/12/2020</Text>

                
                    {/* long answers */}
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>My today's Mission?</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            paddingVertical: 10,
                        }}>
                            <TextInput
                                multiline
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>

                    {/* multiple choice Questions */}
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>I am determined to do important tasks today?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkbox.tick1}
                                onChange={() => updateCheckbox1()}
                            />
                            <Text style={styles.text_options}>Listening Good English for 30 mins</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkbox2.tick2}
                                onChange={() => updateCheckbox2()}
                            />
                            <Text style={styles.text_options}>Teaching and Value Adding in others</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkbox3.tick3}
                                onChange={() => updateCheckbox3()}
                            />
                            <Text style={styles.text_options}>Creating happiness around me</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkbox4.tick4}
                                onChange={() => updateCheckbox4()}
                            />
                            <Text style={styles.text_options}>Acknowledge self and others</Text>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>

                    {/* one liner answer */}
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>My Favorite Moments of the day?</Text>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <Text style={styles.Numbers}>1.</Text>
                            <TextInput maxLength={38}
                                style={[styles.textInput,
                                {
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 2,
                                }]} ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <Text style={styles.Numbers}>2.</Text>
                            <TextInput maxLength={38}
                                style={[styles.textInput,
                                {
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 2,
                                }]} ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <Text style={styles.Numbers}>3.</Text>
                            <TextInput maxLength={38}
                                style={[styles.textInput,
                                {
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 2,
                                }]} ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <Text style={styles.Numbers}>4.</Text>
                            <TextInput maxLength={38}
                                style={[styles.textInput,
                                {
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 2,
                                }]} ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <Text style={styles.Numbers}>5.</Text>
                            <TextInput maxLength={38}
                                style={[styles.textInput,
                                {
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 2,
                                }]} ></TextInput>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>

                    {/* anyone option */}
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>My today’s choices and decision making influenced by</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkChoice.choice1}
                                onChange={() => updateCheckChoice1()}
                            />
                            <Text style={styles.text_options}>Focusing on Outcomes</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkChoice.choice2}
                                onChange={() => updateCheckChoice2()}
                            />
                            <Text style={styles.text_options}>Doing Even Better</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkChoice.choice3}
                                onChange={() => updateCheckChoice3()}
                            />
                            <Text style={styles.text_options}>Confident and Humble</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={checkChoice.choice4}
                                onChange={() => updateCheckChoice4()}
                            />
                            <Text style={styles.text_options}>Sense of awareness of Reality</Text>
                        </View>
                    </View>


                    <View style={{ paddingVertical: 20 }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <LinearGradient
                                colors={['#4700b3', '#4700b3']}
                                style={styles.button}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Daily;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#4700b3",
        height: 50,
        elevation: 10,
        paddingLeft: 10
    },
    QuestionContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20,
        elevation: 7

    },
    Questions: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        fontFamily: 'nunito-bold',
        color: '#666666'
    },
    Numbers: {
        fontFamily: 'nunito-regular',
        fontSize: 18,

    },
    text_options: {
        color: '#05375a',
        fontSize: 17,
        fontFamily: 'nunito-semi',
        paddingHorizontal: 20

    },
    textInput: {
        fontFamily: 'nunito-regular',
        flex: 1,
        color: '#000000',
    },
    button: {
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
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