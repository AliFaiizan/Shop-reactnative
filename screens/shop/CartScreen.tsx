import React ,{useState}from "react";
import { StyleSheet, Text, View, FlatList ,Alert, ActivityIndicator} from "react-native";
import CButton from "../../components/shop/Button";
import { Color } from "../../constants/Colors";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import CartListItem from "../../components/shop/cartitem";
import * as CartAction from "../../store/actions/cart-actions";
import * as OrderAction from "../../store/actions/order-action";
import Card from "../../components/UI/Card";

const CartScreen = (props: any) => {
  const cartAmount = useSelector(
    (state: RootStateOrAny) => state.cart.totalAmount
  );
  const cartItems = useSelector((state: RootStateOrAny) => {
    //return items in array form
    const transformedCartItems = [];
    for (let key in state.cart.item) {
      transformedCartItems.push({
        productid: key,
        productTitle: state.cart.item[key].productTitle,
        productPrice: state.cart.item[key].price,
        quantity: state.cart.item[key].quantity,
        sum: state.cart.item[key].sum,
      });
    }
    //sorting items
    return transformedCartItems.sort((a, b) =>
      a.productid > b.productid ? 1 : -1
    );
  });

  const [isLoading, setIsLoading] = useState(false)

  const sendOrderHandler = async() => {
    setIsLoading(true);
    if (cartAmount <= 0) {
      Alert.alert("CART IS EMPTY", "There is nothing to order", [
        {
          text: "OK",
          style: "default",
        },
      ]);
    } else {
     await dispatch(OrderAction.add_Order(cartItems, cartAmount)); //order functionality
     setIsLoading(false)
    }
  }; 


  
  let dispatch = useDispatch();
  const { screen, summary, summaryText, amount } = styles; //extraction styles
  return (
    <View style={screen}>
      <Card style={summary}>
        <Text style={summaryText}>
          Total: <Text style={amount}>${cartAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (  // if loading than show activity indicator
          <ActivityIndicator size="large" color={Color.Primary} />
        ) : (
          <CButton
            title="OrderNow"
            color={Color.Primary}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productid}
        renderItem={({ item }) => {
          return (
            <CartListItem
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
              onRemove={() => {
                dispatch(CartAction.deleteFromCart(item.productid));
              }}
            />
          );
        }}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Cart",
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Color.Accent,
  },
});
