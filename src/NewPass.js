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
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const NewPass = ({navigation}) => {

    const [data, setData] = React.useState({
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const handlePasswordChange = (pass1) => {
        setData({
            ...data,
            password: pass1
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleConfirmPasswordChange = (pass2) => {
        setData({
            ...data,
            confirm_password: pass2
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const submitHandler = () => {
        console.log(data)
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:3000/api/v1/auth/passwordUpdateConfirmation',
            headers: { },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
            alert(error)
          });
    }

    return (
        
      <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <StatusBar backgroundColor='#4700b3' barStyle="light-content"/>
        <View style={styles.header} />
   
        <Animatable.View 
            animation="fadeInUp"
            style={styles.footer}
        >
           <Text style={{
                fontFamily: 'nunito-bold',
                fontSize: 28,
                color: '#blue',
                color: '#4700b3'
            }}>Reset Password</Text>
            <Text style={{
                fontFamily: 'nunito-semi',
                fontSize: 18,
                paddingBottom: 10,
                color: 'grey'
            }}>Please enter your new password</Text>

            <View style={styles.action}>
                <TextInput 
                    placeholder="Your New Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(pass1) => handlePasswordChange(pass1)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="#4700b3"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="#4700b3"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Confirm Your New Password"
                    style={styles.textInput}
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    autoCapitalize="none"
                    onChangeText={(pass2) => handleConfirmPasswordChange(pass2)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="#4700b3"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="#4700b3"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>  

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => submitHandler}
                    // onPress={() => navigation.push('Login')}
                >
                <LinearGradient
                    colors={['#4700b3', '#4700b3']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    }]}>Reset Password</Text>
                </LinearGradient>
                </TouchableOpacity>
            
            </View>   
      </Animatable.View>   
      </ScrollView>
      </View> 
     
    );
};

export default NewPass;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#4700b3'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomColor: '#4700b3',
        borderBottomWidth: 2,
    },
    textInput: {
        fontFamily: 'nunito-regular',
        flex: 1,
        color: '#000000',  
    },
    button: {
        alignItems: 'center',
        marginTop: 50, 
        paddingBottom:10,    
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: '#000',
        elevation: 6,
    },
    textSign: {
        fontSize: 18,
        fontFamily: 'nunito-bold'
    }
   
  });