import { FlatList } from 'react-native'
import React from 'react'
import ProductListItem from '../../components/shop/ProductListItem'
import { RootStateOrAny, useSelector } from 'react-redux'



const UserProductsScreen = () => {

  const userProduct= useSelector((state:RootStateOrAny)=>state.products.userProducts)

  return (
    <FlatList data={userProduct} renderItem={({item}) => { 
        return <ProductListItem  item={item} onViewDetail={() => {  }} />
     }} /> 
  )
}



export default UserProductsScreen

