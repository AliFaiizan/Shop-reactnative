export const ADD_ORDER = "ADD_ORDER";

export const SET_ORDER = "SET_ORDER";

import Order from '../../models/order';

export const add_Order = (cartItem: any, totalAmount: any) => {
  return async (dispatch: any) => {
    const date = new Date().toISOString();

    try {
      const responce = await fetch(
        "https://onlineshop-e7753-default-rtdb.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application.json",
          },
          body: JSON.stringify({
            cartItem,
            totalAmount,
            date,
          }),
        }
      );

      const resData = await responce.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          item: cartItem,
          amount: totalAmount,
          date,
        },
      });
    } catch {
      (err: any) => {
        console.log(err);
      };
    }
  };
};

export const fetch_Orders = () => {
  return async (dispatch: Function) => {
    try {
      const responce = await fetch(
        "https://onlineshop-e7753-default-rtdb.firebaseio.com/orders/u1.json"
      );
      if (!responce.ok) {
        throw new Error("something went wrong");
      }
      const resData = await responce.json();

      const loadedOrders = [];
      for (const key in resData) {
          
        const {cartItem, totalAmount, date } = resData[key];
        const newOrder:Order={
            id:key,
            item:cartItem,
            totalAmount,
            date:new Date(date)
        }
        loadedOrders.push(newOrder);
      }

      dispatch({ type: SET_ORDER, orders: loadedOrders });
    } catch {
      (err: any) => {
        console.log(err);
      };
    }
  };
};
