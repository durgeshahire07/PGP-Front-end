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
    SafeAreaView
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';

const Login = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        secureTextEntry: true,
    });

    const textInput= (val) => {
            setData({
                ...data,
                username: val,
            });
        }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
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
                color: '#4700b3',                
            }}>Hello There!</Text>
            <Text style={{
                fontFamily: 'nunito-semi',
                fontSize: 18,
                paddingBottom: 10,
                color: 'grey',

            }}>Login to continue</Text>
            <View style={styles.action}>

                <TextInput 
                    placeholder="Email Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInput(val)}
                />
            </View> 
            <View style={styles.action}>
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
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
                <TouchableOpacity
                  onPress={()=> navigation.push('ForgotPass')}
                >
                <Text style={[{fontFamily: 'nunito-bold'},{color: '#4700b3'}]}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}
                >
                <LinearGradient
                    colors={['#4700b3', '#4700b3']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    }]}>Login</Text>
                </LinearGradient>
                </TouchableOpacity>
                <View style={styles.textPrivate}>
                <Text style={[{fontFamily: 'nunito-semi'},{color: 'grey'}]}>
                    Don't have an Account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                >
                <Text style={[{fontFamily: 'nunito-bold'},{color:'#4700b3'}]}>{" "}Sign Up</Text>
                </TouchableOpacity>  
            </View>
            </View>   
               
      </Animatable.View>   
      </ScrollView>  
      </View> 
       
      
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#4700b3'
    },
    
    safeArea: {
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
        paddingHorizontal: '3%', 
        backgroundColor: '#4700b3'
      },
    header: {
        flex: 2,
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
        flex: 1,
        
        fontFamily: 'nunito-regular',
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
  });