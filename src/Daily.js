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
    FlatList,
    Pressable,
    Modal,
    Image

} from 'react-native';

import Slider from '@react-native-community/slider';
import config from '../config'
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
import { sub } from 'react-native-reanimated';

const Daily = ({ navigation, route }) => {
    const {HOST,PORT,GET_SURVEY,SAVE_RESPONSE} = config;
    const user = useContext(UserContext);
    const { type } = route.params
    console.log(type)
    const [state, setState] = useState({
        data: '',
        isLoading: true,
    });

    var submit = true;


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
            url: `http://${HOST}:${PORT}${GET_SURVEY}`,
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
                        ToastAndroid.SHORT)
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

    const onChoiceChange = (selectedChoice, id) => {
        var tmp = state.data
        tmp.map((val) => {
            if (val._id === id) {
                val.answer = selectedChoice
                if (val.answer.length > 1) {
                    val.answer.shift();
                }
            }
        })

        setState({
            ...state,
            data: tmp
        })


    }

    const onSelectionsChange = (selectedItems, id) => {

        var tmp = state.data
        tmp.map((val) => {
            if (val._id === id) {
                val.answer = selectedItems
            }
        })
        setState({
            ...state,
            data: tmp
        })


    }

    const changeParagraph = (value, id) => {
        var temp = state.data
        temp.map((val) => {
            if (val._id === id) {
                val.answer = value
            }
        })
        setState({
            ...state,
            data: temp
        })


    }

    const changeLongPara = (value, id) => {

        var tmp = state.data
        tmp.map((val) => {

            if (val._id === id) {

                val.answer = value

            }
        })
        setState({
            ...state,
            data: tmp
        })

    }

    const handleSliderChange = (val, id, subQue) => {

        var temp = state.data;
        temp.map((que) => {
            if (que._id === id) {
                que.options[subQue].value = val
            }
        })

        setState({
            data: temp
        })
    }


    const changeRes = (que, index) => {
        var temp = res.ans;
        if (que.required) {
            if (que.type == "radio button" && (que.answer == undefined || que.answer.length === 0)) {
                submit = false;
                console.log("radio", que.answer)
            }
            else if (que.type == "short answer" && (que.answer == undefined || que.answer === "")) {
                submit = false;
                console.log("short", que.answer)
            }
            else if (que.type == "long answer" && (que.answer == undefined || que.answer === "")) {
                submit = false;
                console.log("long", que.answer)
            }
            else if (que.type == "check box" && (que.answer === undefined || que.answer.length === 0)) {
                submit = false;
                console.log("check", que.answer)
            }

        }

        if (que.type == "slider") {

            temp.response[index] = { questionID: que._id, questionType: que.type, answer: que.options }

        }
        else {
            temp.response[index] = { questionID: que._id, questionType: que.type, answer: que.answer }
        }
        setRes({
            ans: temp
        })

    }




    async function submitHandler() {
        console.log(submit)
        state.data.map((val, key) => {
            changeRes(val, key)

        })



        if (submit) {
            setState({
                ...state,
                isLoading: true
            })


            try {
                var config = {
                    method: 'post',
                    url: `http://${HOST}:${PORT}${SAVE_RESPONSE}`,
                    headers: {},
                    data: res.ans
                };
                const response = await axios(config)
                console.log(response)
                if (response.data.success) {

                    navigation.replace('Home')
                    ToastAndroid.show("Response saved successfully!👍",
                        ToastAndroid.SHORT)
                }
                else {

                    ToastAndroid.show("Oops...something went wrong!",
                        ToastAndroid.SHORT)
                }
            } catch (error) {

                console.log(error)
                if (error.response.status === 500) {
                    ToastAndroid.show(error,
                        ToastAndroid.SHORT)
                }
            }
        }
        else {

            ToastAndroid.show("Please answer all the required questions",
                ToastAndroid.SHORT)
        }

    }


    if (state.isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ paddingTop: 13 }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Feather
                                name="arrow-left"
                                size={25}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {type === "daily" ?
                        <Text style={{
                            fontFamily: 'nunito-semi',
                            fontSize: 20,
                            color: '#fff',
                            paddingLeft: 10,
                            paddingTop: 10
                        }}>Daily Survey</Text>
                        :
                        type === "weekly" ?
                            <Text style={{
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                color: '#fff',
                                paddingLeft: 10,
                                paddingTop: 10
                            }}>Weekly Survey</Text> :
                            <Text style={{
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                color: '#fff',
                                paddingLeft: 10,
                                paddingTop: 10
                            }}>Monthly Survey</Text>
                    }
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                    <Image style={{ width: 100, height: 100 }} source={require('../assets/gif/new.gif')} />
                </View>
            </View>
        )
    }



    else {

        const submitButton = () => {
            return (
                <View style={{ paddingBottom: 10, paddingHorizontal: 50 }}>
                    <Pressable onPress={submitHandler}
                        android_ripple={{ color: '#fff' }}
                        style={{
                            borderRadius: 20,
                            backgroundColor: '#006699',
                            paddingHorizontal: 70,
                            paddingVertical: 15,
                            backgroundColor: '#4700b3'
                        }} >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                fontFamily: 'nunito-bold',
                                fontSize: 17,
                                color: '#fff',

                            }}>Submit</Text>
                        </View>
                    </Pressable>
                </View>
            )
        }

        const display = (item, key) => {
 
            if (item.type == "radio button") {
                return <View style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>

                        {item.required ?

                            <Text>
                                <Text style={styles.Questions}>{item.question}</Text>
                                <Text style={styles.requiredText}> *</Text>
                            </Text>
                            :
                            <Text style={styles.Questions}>{item.question}</Text>

                        }

                        <SelectMultiple
                            items={item.options}
                            selectedItems={item.answer}
                            onSelectionsChange={choice => onChoiceChange(choice, key)}
                        />
                    </View>

                </View>
            }
            else if (item.type == "check box") {
                return <View style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>
                        {item.required ?

                            <Text>
                                <Text style={styles.Questions}>{item.question}</Text>
                                <Text style={styles.requiredText}> *</Text>
                            </Text>

                            :

                            <Text style={styles.Questions}>{item.question}</Text>

                        }
                        <SelectMultiple
                            items={item.options}
                            selectedItems={item.answer}
                            onSelectionsChange={list => onSelectionsChange(list, key)}
                        />
                    </View>

                </View>
            }
            else if (item.type == "short answer") {
                return <View style={{ paddingHorizontal: 15 }}>

                    <View style={styles.QuestionContainer}>
                        {item.required ?

                            <Text>
                                <Text style={styles.Questions}>{item.question}</Text>
                                <Text style={styles.requiredText}> *</Text>
                            </Text>

                            :
                            <Text style={styles.Questions}>{item.question}</Text>

                        }
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10 }}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'grey',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                padding: 10
                            }}>

                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    style={{
                                        fontFamily: 'nunito-regular',
                                        flex: 1,
                                        textAlignVertical: 'top',
                                        color: '#000000',
                                        height: 70,
                                    }}
                                    onChangeText={(value) => changeParagraph(value, key)}
                                />

                            </View>
                        </View>

                    </View>

                </View>

            }
            else if (item.type == "long answer") {
                return <View style={{ paddingHorizontal: 15 }}>
                    <View style={styles.QuestionContainer}>
                        {item.required ?

                            <Text>
                                <Text style={styles.Questions}>{item.question}</Text>
                                <Text style={styles.requiredText}> *</Text>
                            </Text>

                            :
                            <Text style={styles.Questions}>{item.question}</Text>

                        }
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10 }}>


                            <View style={{
                                borderWidth: 1,
                                borderColor: 'grey',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                padding: 10
                            }}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    style={{
                                        fontFamily: 'nunito-regular',
                                        flex: 1,
                                        textAlignVertical: 'top',
                                        color: '#000000',
                                        height: 180,
                                    }}
                                    onChangeText={(value) => changeLongPara(value, key)}
                                />
                            </View>
                        </View>
                    </View>

                </View>
            }
            else if (item.type == "slider") {
                let subques = item.options.map((ques, index) => {

                    return <View key={index} style={{ flex: 1, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}>
                        <Text style={{ fontFamily: 'nunito-semi', fontSize: 16, color: '#006699' }}>{ques.subQues}</Text>

                        <View style={{ flex: 1, paddingVertical: 20 }} >
                            <Slider
                                style={{ width: '100%' }}
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
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ color: '#c299ff', fontFamily: 'nunito-semi' }}>0</Text>

                                <Text style={{ color: '#5200cc', fontFamily: 'nunito-semi', fontSize: 18 }}>{ques.value}</Text>

                                <Text style={{ color: '#c299ff', fontFamily: 'nunito-semi' }}>{ques.maxValue}</Text>
                            </View>
                        </View>

                    </View>
                })
                return <View style={{ paddingHorizontal: 15, }}>
                    <View style={styles.QuestionContainer}>
                        {item.required ?
                            <View style={{ paddingVertical: 10 }}>
                                <Text>
                                    <Text style={styles.Questions}>{item.question}</Text>
                                    <Text style={styles.requiredText}> *</Text>
                                </Text>
                            </View>
                            :
                            <Text style={styles.Questions}>{item.question}</Text>

                        }
                        {subques}
                    </View>

                </View>
            }

        }



        return (

            <View style={styles.container}>

                <StatusBar backgroundColor='#310080' barStyle="light-content" />

                <View style={styles.header}>

                    <View style={{ paddingVertical: 14 }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Feather
                                name="arrow-left"
                                size={25}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                    {type === "daily" ?
                        <Text style={{
                            fontFamily: 'nunito-semi',
                            fontSize: 20,
                            color: '#fff',
                            paddingLeft: 10,
                            paddingTop: 10
                        }}>Daily Survey</Text>
                        :
                        type === "weekly" ?
                            <Text style={{
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                color: '#fff',
                                paddingLeft: 10,
                                paddingTop: 10
                            }}>Weekly Survey</Text> :
                            <Text style={{
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                color: '#fff',
                                paddingLeft: 10,
                                paddingTop: 10
                            }}>Monthly Survey</Text>
                    }


                </View>

                <FlatList
                    keyExtractor={(item) => item._id}
                    data={state.data}
                    ListFooterComponent={submitButton}
                    renderItem={({ item }) => (
                        <View style={{ paddingVertical: 10 }} >
                            {display(item, item._id)}
                        </View>

                    )}
                />

            </View>
        );

    }
}

export default Daily;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    requiredText: {
        fontFamily: 'nunito-bold',
        color: '#e60000',
        fontSize: 18

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
        borderRadius: 20,
        padding: 20,
        elevation: 7,
    },

    textarea: {
        height: 180,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333',
        fontFamily: 'nunito-regular'
    },
    Questions: {
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
