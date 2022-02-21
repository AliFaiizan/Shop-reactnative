import {createStackNavigator} from 'react-navigation-stack';
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import { Platform } from 'react-native';
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CHeaderButton from "../components/UI/CHeaherButton";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from '../screens/shop/OrderScreen';
import { Color } from '../constants/Colors';



const defaultNavigationOption = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? "#E5E2AC" : "#fff",
    },
    headerTintColor: Platform.OS === "android" ? "#333333" : "",
    headerTitle: "All Products",
  },
};


const ProductsNavigator = createStackNavigator(
  {
    productOverview: {
      screen:ProductsOverview,
      navigationOptions:(navData)=>{
        return {
          headerTitle:'All Products',
          headerRight:()=>{
            return <HeaderButtons HeaderButtonComponent={CHeaderButton} >
              <Item title='cart' iconName='cart' onPress={()=>{
                navData.navigation.navigate('Cart');
              }}  />
            </HeaderButtons>
          }
        }
      }
    },
    productDetail:ProductDetailScreen,
    Cart:CartScreen
  },
    defaultNavigationOption
);

const OrderNavigator=createStackNavigator({
  order:{
    screen:OrderScreen,
    navigationOptions:{
    }
  }
},
    defaultNavigationOption 
)

const ShopNavigator=createDrawerNavigator({
  product:ProductsNavigator,
  Order:OrderNavigator
},{
  contentOptions:{
    activeTintColor:Color.Primary
  }
})

export default createAppContainer(ShopNavigator);

