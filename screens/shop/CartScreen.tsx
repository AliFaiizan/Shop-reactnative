import React from 'react';
import {StyleSheet, Text, View,FlatList} from 'react-native';
import CButton from "../../components/shop/Button";
import {Color} from "../../constants/Colors";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";

import CartListItem from '../../components/shop/cartitem';
import * as CartAction from '../../store/actions/cart-actions';
import * as OrderAction from '../../store/actions/order-action';


const CartScreen = (props:any) => {
    const cartAmount=useSelector((state:RootStateOrAny) => state.cart.totalAmount);
    const cartItems=useSelector((state:RootStateOrAny )=>{ //return items in array form
        const transformedCartItems=[];
        for (let key in state.cart.item){

            transformedCartItems.push({
                productid:key,
                productTitle:state.cart.item[key].productTitle,
                productPrice:state.cart.item[key].price,
                quantity:state.cart.item[key].quantity,
                sum:state.cart.item[key].sum
            })
        }
        return transformedCartItems.sort((a,b) => a.productid>b.productid?1:-1);
    });
    let dispatch=useDispatch();
    const {screen,summary,summaryText,amount}=styles; //extractign styles
    return (
        <View style={screen}>
            <View style={summary}>
                <Text style={summaryText}>Total: <Text style={amount}>${cartAmount.toFixed(2)}</Text></Text>
                <CButton title='OrderNow' color={Color.Primary} onPress={()=>{
                    dispatch(OrderAction.add_Order(cartItems, cartAmount));// order functionality
                }} />
            </View>
            <FlatList data={cartItems} keyExtractor={item => item.productid} renderItem={({item})=>{
                return <CartListItem quantity={item.quantity} title={item.productTitle}
                    amount={item.sum}
                    onRemove={()=>{
                        dispatch(CartAction.deleteFromCart(item.productid));
                    }}
                />  }} />

        </View>
    )
};

export default CartScreen;

const styles = StyleSheet.create({
    screen:{
        margin:20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor:'white',

    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18,
    },
    amount:{
        color:Color.Accent,
    }
});