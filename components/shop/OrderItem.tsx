import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CButton from './Button';
import CartItem from './cartitem';
import { Color } from '../../constants/Colors';
import moment from 'moment';
import Card from '../UI/Card';


const OrderItem = ({item}:any) => {

    const [showDetail,setShowDetail]=useState(false);
    

    const {orderItem,summary,totalAmount,date}=styles;
    const Mdate=moment().format('MMMM Do YYYY, hh:mm') //Moment date

  return (
    <Card style={orderItem}>
      <View style={summary}>
        <Text style={totalAmount}>${item.totalAmount.toFixed(2)}</Text>
        <Text style={date}>{Mdate}</Text>
      </View> 
      <CButton
        title={showDetail?"Hide Detail":"Show Detail"}
        onPress={() => {
            setShowDetail((prevState) => { return !prevState })
         
        }}
        color={Color.Primary}
      />
      {showDetail && <View style={styles.cartitem}>
            {item.item.map((item:any) => { return <CartItem key={item.productid} quantity={item.quantity} title={item.productTitle} amount={item.sum}  /> })}
          </View>}
    </Card>
  );
}

export default OrderItem

const styles = StyleSheet.create({
  orderItem: {
    alignItems:'center',
    backgroundColor: Color.skin,
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding:10,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    color:'#888'
  },
  cartitem:{
      paddingTop:10,
      width:'100%'
  }
});