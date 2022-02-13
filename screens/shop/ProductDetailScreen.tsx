import React from 'react';
import {StyleSheet, Text, View,ScrollView,Image,} from 'react-native';
import CButton from '../../components/shop/Button'
import {Color} from "../../constants/Colors";
const ProductDetailScreen = ({navigation}:any) => {
    let product=navigation.state.params;
    let {image,description,price,actions}=styles;
    return (
       <ScrollView>
           <Image style={image} source={{uri:product.imageUrl}} />
           <View style={actions}>
               <CButton title='Add To Cart' onPress={()=>{}} color={Color.Primary}/>
           </View>
           <Text style={price}>${product.price}</Text>
           <Text style={description}>{product.description}</Text>
       </ScrollView>
    )
};
ProductDetailScreen.navigationOptions=(navData:any)=>{

    return {
        headerTitle:navData.navigation.getParam('title')
    }
};
export default ProductDetailScreen;

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300,
    },
    price:{
        fontSize:20,
        color: '#888',
        textAlign:'center',
        marginVertical:20,

    },
    description:{
        fontSize: 14,
        textAlign: 'center',
    },
    actions:{
        marginVertical:10,
        alignItems:'center'
    }
});