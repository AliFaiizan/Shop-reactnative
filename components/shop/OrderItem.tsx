import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CButton from './Button';
import CartItem from './cartitem';
import { Color } from '../../constants/Colors';
import moment from 'moment';


const OrderItem = ({item}:any) => {

    const {orderItem,summary,totalAmount,date}=styles;
    const Mdate=moment().format('MMMM Do YYYY, hh:mm') //Moment date

  return (
    <View style={orderItem}>
      <View style={summary}>
        <Text style={totalAmount}>${item.totalAmount}</Text>
        <Text style={date}>{Mdate}</Text>
      </View> 
      <CButton
        title="Show Detail"
        onPress={() => {
          console.log("show detail button");
        }}
        color={Color.Primary}
      />
    </View>
  );
}

export default OrderItem

const styles = StyleSheet.create({
  orderItem: {
    alignItems:'center',
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
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
});