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
import axios from 'axios'



const SignUp = ({navigation}) => {

    const [data, setData] = React.useState({
        firstName:'',
        lastName: '',
        userEmailId: '',
        password: ''
    });

    const[secureEntry, setSecureEntry] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        confirm_password: ''
    })

    const textInputFirstName = (first) =>{
        setData({
            ...data,
            firstName: first
        })
    }
    const textInputlastName = (last) => {
        setData({
            ...data,
            lastName: last
        })
    }
    const textInputChange = (user) => {
        
        if( user.length > 10 ) {
            setSecureEntry({
                ...secureEntry,
                check_textInputChange: true
            })
            setData({
                ...data,
                userEmailId: user,
            });
        } else {
            setSecureEntry({
                ...secureEntry,
                check_textInputChange: false
            })
            setData({
                ...data,
                userEmailId: user
            });
        }
    }

    const handlePasswordChange = (pass1) => {
        setData({
            ...data,
            password: pass1
        });
    }

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }

    const handleConfirmPasswordChange = (pass2) => {
        setSecureEntry({
            ...secureEntry,
            confirm_password: pass2
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            confirm_secureTextEntry: !secureEntry.confirm_secureTextEntry
        });
    }
     async function submitHandler () {
          if(data.password!=secureEntry.confirm_password){
              alert("password don't match")
          }
          else{
          try{
            var config = {
                method: 'post',
                url: 'http://127.0.0.1:3000/api/v1/auth/register',
                headers: { },
                data : data
              };
              const key = await axios(config)
              const response = key
              console.log(response)
              if(response.data.success){
                navigation.push('Home')
            }
            else{
                alert("Sign Up failed")
            }
            }catch(error){
                console.log(error)
                alert(error)
            }
        }
   }
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
         
        <StatusBar backgroundColor='#4700b3' barStyle="light-content"/>
        <View style={styles.header} />
        <Text style={{
                fontFamily: 'nunito-bold',
                fontSize: 28,
                color: '#fff',
                paddingLeft: 20
            }}>Hey, get on board</Text>
            <Text style={{
                fontFamily: 'nunito-semi',
                fontSize: 18,
                paddingBottom: 30,
                color: '#fff',
                paddingLeft:20,
            }}>Sign up to start your Journey!</Text>
              
        <Animatable.View 
            animation="fadeInUp"
            style={styles.footer}
        >
          
            <View style={styles.action}>
                <TextInput 
                    placeholder="First Name"
                    style={styles.textInput}
                    onChangeText={(first) => textInputFirstName(first)}
                />
            </View>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Last Name"
                    style={styles.textInput}
                    onChangeText={(last) => textInputlastName(last)}
                />
            </View>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Email Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(userEmailId) => textInputChange(userEmailId)}
                />
                {secureEntry.check_textInputChange ? 
                    <Animatable.View
                    animation="bounceIn"
                    >
                    <Feather 
                        name="check"
                        color="#8533ff"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View> 
            <View style={styles.action}>
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={secureEntry.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(pass1) => handlePasswordChange(pass1)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {secureEntry.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="#a6a6a6"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="#8533ff"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Confirm Your Password"
                    style={styles.textInput}
                    secureTextEntry={secureEntry.confirm_secureTextEntry ? true : false}
                    autoCapitalize="none"
                    onChangeText={(pass2) => handleConfirmPasswordChange(pass2)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {secureEntry.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="#a6a6a6"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="#8533ff"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>  
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[{color: '#595959'}, {fontFamily: 'nunito-bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[{color: '#595959'}, {fontFamily: 'nunito-bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={submitHandler}
                >
                <LinearGradient
                    colors={['#4700b3', '#4700b3']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>
                <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Already have an Account?
                </Text>
                <TouchableOpacity
                 onPress={() => navigation.push('Login')}
                >
                <Text style={[{color:'#4700b3'}, {fontFamily: 'nunito-bold'}]}>{" "}Login</Text>
                </TouchableOpacity>  
            </View>
            </View>   
      </Animatable.View>   
      
      </View> 
      </ScrollView>
    );
};

export default SignUp;

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
        flex: 2,
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