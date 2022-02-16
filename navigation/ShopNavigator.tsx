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
  {
    defaultNavigationOptions: {
      headerStyle: {
        
        backgroundColor: Platform.OS === "android" ? "#E5E2AC" : "#fff",
      },
      headerTintColor: Platform.OS === "android" ? "#333333" : "",
      headerTitle:'All Products'
    },
  }
);


export default createAppContainer(ProductsNavigator);

