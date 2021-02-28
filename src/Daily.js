import React, { useContext, useState, useEffect } from 'react';
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
    ActivityIndicator,
    ToastAndroid,
    FlatList

} from 'react-native';

import Slider from '@react-native-community/slider';

import { UserContext } from '../userContext'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton, State } from 'react-native-gesture-handler';
import axios from 'axios'
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';
import SelectMultiple from 'react-native-select-multiple'
import Textarea from 'react-native-textarea';

const Daily = ({ navigation, route }) => {
    const user = useContext(UserContext);
    const { type } = route.params
    const [state, setState] = useState({
        data: '',
        isLoading: true,

    });

    const [res, setRes] = useState({
        ans: {
            userID: user.userData.userID,
            surveyType: type,
            response: []
        }
    })
    
    const request = {
        "surveyType": type
    }


    const getSurvey = () => {
        var config = {
            method: 'post',
            url: 'http://192.168.43.19:3000/api/v1/survey/getSurvey',
            headers: {},
            data: request
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response));

                if (response.data.success) {
                    setState({
                        isLoading: false,
                        data: response.data.data
                    })
                }
                else {
                    ToastAndroid.show("Oops...something went wrong!",
                        ToastAndroid.LONG)
                }
            })
            .catch(function (error) {
                console.log(error);
                ToastAndroid.show(error,
                    ToastAndroid.SHORT)
            });
    }
    useEffect(() => {
        getSurvey()
    }, [])

    const onChoiceChange = (selectedChoice, index) => {
        var tmp = state.data
        tmp[index].answer = selectedChoice
        if (tmp[index].answer.length >= 2) {
            tmp[index].answer.shift();
        }
        
        setState({
            data: tmp
        })
    }

    const onSelectionsChange = (selectedItems, key) => {
        var tmp = state.data
        tmp[key].answer = selectedItems
        setState({
            ...state,
            data: tmp
        })
        
    }

    const changeParagraph = (value, key) => {
        var temp = state.data
        temp[key].answer = value
        setState({
            ...state,
            data: temp
        })

    }

    const changeLongPara = (value, key) => {
        var tmp = state.data
        tmp[key].answer = value
        setState({
            ...state,
            data: tmp
        })
    }


    const changeRes = (que, index) => {
        var temp = res.ans;
        if(que.type=="slider"){
           
            temp.response[index] = {questionID: que._id, questionType:que.type, answer: que.options}
        }
        else{
        temp.response[index] = { questionID: que._id, questionType: que.type, answer: que.answer }
        }
        setRes({
            ans: temp
        })
        console.log(res.ans);
    }

   
   

    async function submitHandler() {
       



        let dummy= state.data.map((val, key) => {
            changeRes(val, key)
        })
        console.log(res.ans)       
        try {
            var config = {
                method: 'post',
                url: 'http://192.168.43.19:3000/api/v1/survey/saveResponse',
                headers: {},
                data: res.ans
            };
            const response = await axios(config)
            console.log(response)
            if (response.data.success) {
                
                navigation.replace('Home')
                ToastAndroid.show("Response saved successfully!👍",
                    ToastAndroid.LONG)
            }
            else {
                
                ToastAndroid.show("Oops...something went wrong!",
                    ToastAndroid.LONG)
            }
        } catch (error) {
            
            console.log(error)
            if (error.response.status === 500) {
                ToastAndroid.show(error,
                    ToastAndroid.LONG)
            }
        }

    }

    const handleSliderChange = (val, que, subQue) => {
        
        var temp = state.data;
        temp[que].options[subQue].value = val;
        setState({
            data:temp
        })
    }



    if (state.isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ paddingTop: 13 }}>

                        <Feather
                            name="arrow-left"
                            size={25}
                            color="#fff"
                        />

                    </View>

                    <Text style={{
                        fontFamily: 'nunito-semi',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft: 10,
                        paddingTop: 10
                    }}>Daily Personal Growth Planner</Text>
                </View>

                {/* <LottieView 
         source={require("../assets/gif/6551-loading-39-hourglass.json")} autoPlay loop /> */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        )
    }
    else {

        let question = state.data.map((val, key) => {
            if (val.type == "radio button") {

                return <View key={key} style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>{val.question}</Text>
                        <SelectMultiple
                            items={val.options}
                            selectedItems={val.answer}
                            onSelectionsChange={choice => onChoiceChange(choice, key)}
                        />
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>
                </View>
            }
            else if (val.type == "text") {
                return <View key={key} style={{ paddingHorizontal: 15 }}>

                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>{val.question}</Text>
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
                                style={styles.textInput}
                                onChangeText={(value) => changeParagraph(value, key)}
                            />
                        </View>

                    </View>
                    <View style={{ paddingBottom: 20 }}></View>
                </View>

            }
            else if (val.type == "check box") {
                return <View key={key} style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>{val.question}</Text>
                        <SelectMultiple
                            items={val.options}
                            selectedItems={val.answer}
                            onSelectionsChange={list => onSelectionsChange(list, key)}
                        />
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>
                </View>
            }
            else if (val.type == "text fields") {
                return <View key={key} style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>{val.question}</Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(value) => changeLongPara(value, key)}
                        />
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>
                </View>
            }
            else if (val.type == "slider") {
                let subques = val.options.map((ques, index) => {

                    return <View key={index} style={{ flex: 1, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}>
                        <Text style={{ fontFamily: 'nunito-semi', fontSize: 16, color: '#006699' }}>{ques.subQues}</Text>

                        <View style={{ flex: 1, paddingVertical: 20 }} >
                            <Slider
                                style={{ width: 290 }}
                                minimumValue={0}
                                maximumValue={ques.maxValue}
                                minimumTrackTintColor="#5200cc"
                                maximumTrackTintColor="#944dff"
                                thumbTintColor="#5200cc"
                                value={ques.value}
                               
                                step={1}
                                
                               
                                onSlidingComplete={(value) => handleSliderChange(value, key, index)}
                                
                            />

                            <View style={{
                                width: 290,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{color: '#c299ff',fontFamily:'nunito-semi'}}>0</Text>
                               
                                <Text style={{color: '#5200cc',fontFamily:'nunito-semi',fontSize:18}}>{ques.value}</Text>
                               
                                <Text style={{color: '#c299ff',fontFamily:'nunito-semi'}}>{ques.maxValue}</Text>
                            </View>
                        </View>

                    </View>
                })
                return <View key={key} style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>
                        <Text style={styles.Questions}>{val.question}</Text>
                        {subques}
                    </View>
                    <View style={{ paddingBottom: 20 }}></View>
                </View>
            }

        })

        return (

            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#310080' barStyle="light-content" />

                <View style={styles.header}>
                    <View style={{ paddingVertical:14 }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
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
                    <View style={{
                        paddingTop: 15,
                        paddingBottom: 10
                    }}>
                        <View style={styles.container}>

                            {/* <Text style={{
                            fontFamily: 'nunito-semi',
                            fontSize: 15,
                            color: '#a6a6a6',
                            textAlign: 'center',
                            paddingTop: 15,
                            paddingBottom: 10
                        }}>date</Text> */}

                            {question}

                            <View style={{ paddingBottom: 20 }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    alignItems: "center",

                                }}
                                    onPress={submitHandler}
                                >
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
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Daily;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    textareaContainer: {
        height: 180,
        padding: 5,
        borderWidth: 1,
        borderColor: 'grey',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textarea: {
        textAlignVertical: 'top',
        height: 170,
        fontSize: 14,
        color: '#333',
        fontFamily: 'nunito-regular'
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