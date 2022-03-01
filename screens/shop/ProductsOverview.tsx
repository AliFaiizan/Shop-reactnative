import { View, FlatList } from "react-native";
import React, { FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ProductListItem from "../../components/shop/ProductListItem";
import { Color } from "../../constants/Colors";
import * as CartActions from "../../store/actions/cart-actions";

import CHeaderButton from "../../components/UI/CHeaherButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import CButton from "../../components/shop/Button";


const ProductsOverview: FC = (props: any) => {
  let dispatch = useDispatch();
  const products = useSelector(
    (state: RootStateOrAny) => state.products.availableProducts
  );
  return (
    <View style={{ backgroundColor: Color.skin }}>
      <FlatList
        data={products}
        renderItem={(itemData) => {
          return (
            <ProductListItem
              item={itemData.item}
            >
              <CButton
                title="View Detail"
                onPress={() => {
                  props.navigation.navigate("Details", itemData.item);
                }}
                color={Color.Accent}
              />
              <CButton
                title="Add to Cart"
                onPress={() => {
                  dispatch(CartActions.addToCart(itemData.item));
                  props.navigation.navigate("Cart");
                }}
                color={Color.Primary}
              />
            </ProductListItem>
          );
        }}
      />
    </View>
  );
};

export const screenOptions = () => {
  const navigation = useNavigation();
  return {
    headerTitle: "All Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="cart"
            iconName="cart"
            onPress={() => {
              navigation.navigate("Cart")
            }}
          />
        </HeaderButtons>
      );
    },
    
  };
};

export default ProductsOverview;
