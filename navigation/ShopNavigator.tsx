import React from "react";

import { Platform } from "react-native";
import { Color } from "../constants/Colors";

//Version 5 migraiton

import ProductsOverview, {
  screenOptions as productOverviewOptions,
} from "../screens/shop/ProductsOverview";
import CartScreen, {
  screenOptions as CartOptions,
} from "../screens/shop/CartScreen";
import OrderScreen, {
  screenOptions as OrderOptions,
} from "../screens/shop/OrderScreen";
import ProductDetailScreen, {
  screenOptions as productDetailOptions,
} from "../screens/shop/ProductDetailScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const productsStack = createNativeStackNavigator();
const orderStack = createNativeStackNavigator();
const shopDrawer = createDrawerNavigator();

const ProductsNavigator = () => {
  // this returns full produt navigator
  return (
    <productsStack.Navigator screenOptions={defaultNavigationOption}>
      <productsStack.Screen
        name="Product"
        component={ProductsOverview}
        options={productOverviewOptions}
      />

      <productsStack.Screen
        name="Details"
        component={ProductDetailScreen}
        options={productDetailOptions}
      />
      <productsStack.Screen
        name="Cart"
        component={CartScreen}
        options={CartOptions}
      />
    </productsStack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <orderStack.Navigator screenOptions={defaultNavigationOption}>
      <orderStack.Screen
        name="Order"
        component={OrderScreen}
        options={OrderOptions}
      />
    </orderStack.Navigator>
  );
};

const ShopDrawerNavigator = () => {
  return (
    <shopDrawer.Navigator screenOptions={defaultNavigationOption}>
      <shopDrawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{ headerShown: false }}
      />
      <shopDrawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={{ headerShown: false }}
      />
    </shopDrawer.Navigator>
  );
};

const AppNavigator = (props: any) => {
  return (
    <NavigationContainer>
      <ShopDrawerNavigator />
    </NavigationContainer>
  );
};

const defaultNavigationOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#E5E2AC" : "#fff",
  },
  headerTintColor: Platform.OS === "android" ? "#333333" : "",
};

export default AppNavigator;

// const ProductsNavigator = createStackNavigator(
//   {
//     productOverview: {
//       screen:ProductsOverview,
//       navigationOptions:(navData)=>{
//         return {
//           headerTitle:'All Products',
//           headerRight:()=>{
//             return <HeaderButtons HeaderButtonComponent={CHeaderButton} >
//               <Item title='cart' iconName='cart' onPress={()=>{
//                 navData.navigation.navigate('Cart');
//               }}  />
//             </HeaderButtons>
//           }
//         }
//       }
//     },
//     productDetail:ProductDetailScreen,
//     Cart:CartScreen
//   },
//     defaultNavigationOption
// );

// const OrderNavigator=createStackNavigator({
//   order:{
//     screen:OrderScreen,
//     navigationOptions:{
//     }
//   }
// },
//   defaultNavigationOption
// )

// const ShopNavigator=createDrawerNavigator({
//   product:ProductsNavigator,
//   Order:OrderNavigator
// },{
//   contentOptions:{
//     activeTintColor:Color.Primary
//   }
// })
