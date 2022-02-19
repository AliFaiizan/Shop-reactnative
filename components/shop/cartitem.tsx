import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Color} from "../../constants/Colors";


const CartItem = ({onRemove,quantity,amount,title}:any) => {
    const {cartItem,itemData,qty,mainText,deleteButton}=styles;
    return (
        <>
        <View style={cartItem}>
            <View style={itemData}>
                <Text style={qty}>{quantity}</Text>
                <Text style={mainText}>{title}</Text>
            </View>
            <View style={itemData}>
                <Text style={mainText}>${amount}</Text>
                <TouchableOpacity onPress={onRemove} style={deleteButton}>
                    <Ionicons
                        name={Platform.OS==='android'?'md-trash':'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
};

export default CartItem;

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        marginBottom:10,
        backgroundColor:"white",
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        borderRadius:5,
    },
    itemData:{
        flexDirection: 'row',
        alignItems:'center'
    },
    qty:{
        fontFamily:'open-sans',
        color:Color.dark,
        fontSize:16,

    },

    mainText:{
        fontFamily: 'open-sans-bold',
        fontSize:16,
    },
    deleteButton:{
        marginLeft:20
    }
});