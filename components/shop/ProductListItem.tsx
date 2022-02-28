
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,TouchableNativeFeedback,Platform } from 'react-native';
import Product from '../../models/product';
import CButton from '../../components/shop/Button'
import {Color} from "../../constants/Colors";


export default function ProductListItem({item,onViewDetail,onAddToCart}:any) {
  const {container,image,imageContainer,actions,price,detail,title}=styles;
  let Touch:any= TouchableOpacity;
  if(Platform.OS==="android"){
     Touch=TouchableNativeFeedback;
  }else{

  }
  return (
      <Touch onPress={onViewDetail} activeOpacity={0.2} useForeground>
        <View style={[container,{backgroundColor:Color.ofwhite}]}>
          <>
          <View style={imageContainer}>
            <Image style={image} source={{uri:item.imageUrl}} />
          </View>

          <View style={detail}>
            <Text style={title}>{item.title}</Text>
            <Text style={price}>${item.price}</Text>
          </View>


          <View style={actions} >
           <CButton title='View Detail' onPress={onViewDetail} color={Color.Accent} />
           {onAddToCart&&<CButton title='Add to Cart' onPress={onAddToCart} color={Color.Primary} />}
          </View>
            </>
      </View>
      </Touch>

  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    height: 270,
    margin: 15,
    overflow: 'hidden'
  },
  title:{
    fontSize: 16,
    fontWeight:'bold'
  },
  imageContainer:{
    width: "100%",
    height: "60%",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail:{
    alignItems:'center',
    height:'15%',
    padding:10
  },
  price:{
    fontSize:14,
    color:'#888',
  },
  actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:'25%',
    paddingHorizontal:20
  },
});
