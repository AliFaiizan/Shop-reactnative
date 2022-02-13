import {createStackNavigator} from 'react-navigation-stack';

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import { Platform } from 'react-native';
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";




const ProductsNavigator = createStackNavigator(
  {
    productOverview: ProductsOverview,
    productDetail:ProductDetailScreen
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

