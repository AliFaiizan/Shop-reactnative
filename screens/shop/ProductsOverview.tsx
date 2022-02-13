import { View,FlatList } from 'react-native';
import React, {FC} from 'react';
import {RootStateOrAny,useSelector} from 'react-redux';
import ProductListItem from '../../components/shop/ProductListItem';
import {Color} from "../../constants/Colors";





const ProductsOverview:FC=(props:any) => {

  const products = useSelector((state:RootStateOrAny)=>state.products.availableProducts);
  return (
    <View style={{backgroundColor:Color.skin}}>
      <FlatList data={products} renderItem={(itemData)=>{
          return <ProductListItem item={itemData.item} onViewDetail={()=>{
              props.navigation.navigate('productDetail',itemData.item)
          }}
          onAddToCart={()=>{
              props.navigation.navigate('productDetail')
          }
          }
          />;
      }} />
    </View>
  );
};

export default ProductsOverview;



