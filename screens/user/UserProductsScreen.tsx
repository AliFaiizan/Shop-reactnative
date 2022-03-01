import { FlatList } from 'react-native'
import React from 'react'
import ProductListItem from '../../components/shop/ProductListItem'
import { RootStateOrAny, useSelector } from 'react-redux'
import CButton from '../../components/shop/Button'
import { Color } from '../../constants/Colors'



const UserProductsScreen = () => {

  const userProduct= useSelector((state:RootStateOrAny)=>state.products.userProducts)

  return (
    <FlatList data={userProduct} renderItem={({item}) => { 
        return (
          <ProductListItem item={item} >
            <CButton
              title="Edit"
              onPress={() => {  }}
              color={Color.Accent}
            />
            <CButton
              title="Delete"
              onPress={() => { 
                  return userProduct.filter((i:any) => { return item.id!==i.id })
               }}
              color={Color.Primary}
            />
          </ProductListItem>
        );
     }} /> 
  )
}



export default UserProductsScreen

