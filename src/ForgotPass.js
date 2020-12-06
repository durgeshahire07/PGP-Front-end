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
    Keyboard,
    SafeAreaView,
    
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'

const ForgotPass = ({navigation}) => {

    return (
        
         
      <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          
        <StatusBar backgroundColor='#4700b3' barStyle="light-content"/>
        <View style={styles.text_header}>
        
            </View>
           
        <Animatable.View 
            animation="fadeInUp"
            style={styles.footer}
        >
              <Text style={{
                fontFamily: 'nunito-bold',
                fontSize: 28,
                color: '#4700b3',
                paddingBottom: 5
            }}>Forgot Password?</Text>
           
             <Text style={{
                fontFamily: 'nunito-regular',
                fontSize: 15,
                color: 'grey',
                paddingBottom: 20
            }}>To recover your password, you need to enter your 
            registered email address. We'll send the recovery 
            code to your email</Text>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="Email Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                />
            </View> 

        
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => navigation.push('Otp')}
                >
                <LinearGradient
                    colors={['#4700b3', '#4700b3']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    }]}>Get OTP</Text>
                </LinearGradient>
                </TouchableOpacity>
                <View style={styles.textPrivate}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[{fontFamily: 'nunito-bold'},{color:'#4700b3'}]}>Back to Login</Text>
                </TouchableOpacity>
                </View>
               
            </View>   
            
      </Animatable.View>   
      
      </ScrollView>
      </View> 
      
      
    
      
    );
};

export default ForgotPass;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#4700b3'
    },
    text_header: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,   
        justifyContent: 'flex-start' 
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
        color: '#000000'
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
  });