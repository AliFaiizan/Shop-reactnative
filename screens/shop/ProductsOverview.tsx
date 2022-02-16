import { View,FlatList } from 'react-native';
import React, {FC} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import ProductListItem from '../../components/shop/ProductListItem';
import {Color} from "../../constants/Colors";
import * as CartActions from "../../store/actions/cart-actions";
import {ADD_TO_CART} from "../../store/actions/cart-actions";





const ProductsOverview:FC=(props:any) => {
    let dispatch=useDispatch();
  const products = useSelector((state:RootStateOrAny)=>state.products.availableProducts);
  return (
    <View style={{backgroundColor:Color.skin}}>
      <FlatList data={products} renderItem={(itemData)=>{
          return <ProductListItem item={itemData.item} onViewDetail={()=>{
              props.navigation.navigate('productDetail',itemData.item)
          }}
          onAddToCart={()=>{
              dispatch(CartActions.addToCart(itemData.item));
              props.navigation.navigate('cart')
          }
          }
          />;
      }} />
    </View>
  );
};

export default ProductsOverview;

