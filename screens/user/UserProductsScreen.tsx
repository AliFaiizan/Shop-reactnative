import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ProductListItem from '../../components/shop/ProductListItem'



const UserProductsScreen = () => {
  return (
    <FlatList data={[]} renderItem={ProductListItem} /> 
  )
}

export default UserProductsScreen

const styles = StyleSheet.create({})