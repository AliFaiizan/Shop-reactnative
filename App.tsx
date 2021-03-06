
import "react-native-gesture-handler";
import React, {useState,useEffect} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'
import productsReducer from './store/reducers/product-reducer';
import cartReducer from './store/reducers/cart-reducer'; 
import orderReducer from "./store/reducers/order-reducer";
import auth from "./store/reducers/auth";

import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import {Provider} from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';




const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth:auth,
});

const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {

    const [fontloaded, setFontloaded] = useState(false);

    //fetch fonts to use in styleSheet
    const fetchFont= ()=>{
        return Font.loadAsync({
            'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
        })
    };
    //if font is loaded the load the app

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

