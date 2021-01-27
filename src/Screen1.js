import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const Screen1 = ({navigation}) =>{
    return(
    <View style={{flex:1}}>
        <View style={{flexDirection: 'row',
        backgroundColor: "#4700b3",
        height: 50,
        elevation: 10,
        paddingLeft: 10}}>
                <View style={{ paddingTop: 13 }}>
                        <TouchableOpacity onPress={()=> navigation.openDrawer()}>
                            <Feather
                                name="menu"
                                size={24}
                                color="#fff"
                            />
                            </TouchableOpacity>
                            </View>
                            <Text style={{
                        fontFamily: 'nunito-bold',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft: 15,
                        paddingTop: 10
                    }}>Screen1</Text>
                </View>
        <Text>SCREEN1</Text>
    </View>
    )
}

export default Screen1;