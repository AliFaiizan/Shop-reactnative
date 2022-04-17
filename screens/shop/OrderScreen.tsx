import { Text, FlatList, ActivityIndicator, View } from "react-native";
import React ,{useEffect, useState} from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CHeaderButton from "../../components/UI/CHeaherButton";
import OrderItem from "../../components/shop/OrderItem";
import * as OrderActions from '../../store/actions/order-action'
import { Color } from "../../constants/Colors";

const OrderScreen = () => {

  const [isLoading,setIsLoading]= useState(false)
  const dispatch= useDispatch();


  useEffect(() => {
    dispatch(OrderActions.fetch_Orders())
  
    
  }, [dispatch])

  if(isLoading){
     return (
       <View
         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
       >
         <ActivityIndicator size="large" color={Color.Primary} />
       </View>
     );
  }
  

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
///suctom comment
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
