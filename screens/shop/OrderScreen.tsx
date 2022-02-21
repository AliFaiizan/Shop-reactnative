import {  Text,FlatList } from 'react-native'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'


const OrderScreen = () => {

    const orders=useSelector((state:RootStateOrAny) => {return state.order.orders })
  return (
    <>
    <FlatList data={orders}  renderItem={(itemData) => { return <Text>{itemData.item.totalAmount}</Text> }}/>
    </>
  )
}

export default OrderScreen

