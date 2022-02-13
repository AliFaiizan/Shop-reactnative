import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity,TouchableNativeFeedback,TouchableHighlight} from 'react-native';

export default Button = ({title,onPress,color}) => {
    const {container,text}=styles;
    return (

    <TouchableNativeFeedback  onPress={onPress} >
        <View style={[container,{backgroundColor:color}]}>
            <Text style={text}>
                {title}
            </Text>
        </View>
    </TouchableNativeFeedback>

    )
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        height:40,
        width:120,
    },
    text:{
        fontSize:14,
        fontWeight:'bold'
    }
});