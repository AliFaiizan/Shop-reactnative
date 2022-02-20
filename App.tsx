
import React, {useState} from 'react';
import {createStore, combineReducers} from 'redux';
import productsReducer from './store/reducers/product-reducer';
import cartReducer from './store/reducers/cart-reducer'; 
import orderReducer from "./store/reducers/order-reducer";

import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import {Provider} from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store=createStore(rootReducer);

export default function App() {
    const fetchFont= ()=>{
        return Font.loadAsync({
            'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
        })
    };

    const [fontloaded,setFontloaded]=useState(false);
    if(!fontloaded){
        return <AppLoading startAsync={fetchFont}  onFinish={()=>{
            setFontloaded(true);
        }} onError={()=>{setFontloaded(false)}} />

    }

  return (

      <Provider store={store}>
          <ShopNavigator/> 
      </Provider>
    
  );
}

