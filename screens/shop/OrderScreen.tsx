import { Text, FlatList } from "react-native";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CHeaderButton from "../../components/UI/CHeaherButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = () => {
  const orders = useSelector((state: RootStateOrAny) => {
    return state.order.orders;
  });
  return (
    <>
      <FlatList
        data={orders}
        renderItem={(itemData) => {
          return <OrderItem
         item={itemData.item}
           />;
        }}
      />
    </>
  );
};
//screen options for order screen
export const screenOptions = (navData: any) => {
  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default OrderScreen;
