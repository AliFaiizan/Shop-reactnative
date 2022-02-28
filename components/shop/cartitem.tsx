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
            <Text numberOfLines={1} ellipsizeMode="tail" style={mainText}>
              {title}
            </Text>
          </View>
          <View style={itemData}>
            <Text style={mainText}>${amount.toFixed(2)}</Text>
            {onRemove && (
              <TouchableOpacity onPress={onRemove} style={deleteButton}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  size={23}
                  color="red"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
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
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around'
        
    },
    qty:{
        paddingRight:5,
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