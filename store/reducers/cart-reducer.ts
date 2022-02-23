import {ADD_TO_CART, DELETE_FROM_CART}from '../actions/cart-actions';
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from '../actions/order-action';



type state={
    item:any,
    totalAmount:number
}

const initailState:state={
    item:{},
    totalAmount:0
};

export default (state=initailState,action:any)=>{
    let updatedOrNewCartItem:CartItem;
    let updatedCartItem;
    switch (action.type) {
        //ADD TO CART
        case ADD_TO_CART:
            const {id,price,title}=action.product;

            if(state.item[id]){
                // already have item in cart
                updatedOrNewCartItem={
                    quantity:state.item[id].quantity+1,
                    productTitle:title,
                    productPrice:price,
                    sum:state.item[id].sum+price
                }
            }else{
                updatedOrNewCartItem={
                    productPrice:price,
                    productTitle:title,
                    sum:price,
                    quantity:1
                }
            }
            return {
                ...state,
                item:{...state.item, [id]:updatedOrNewCartItem },
                totalAmount:state.totalAmount+price
            }
        //DELETE FROM CART
        case DELETE_FROM_CART:
            const pid:any=action.pid
            const currentQuantity=state.item[pid].quantity;
             const selectedProduct = state.item[pid];
            if(currentQuantity>1){
               

                const updatedItem={
                   
                    quantity:selectedProduct.quantity-1,
                    productPrice:selectedProduct.productPrice,
                    productTitle:selectedProduct.productTitle,
                    sum:selectedProduct.sum-selectedProduct.productPrice

                }
               updatedCartItem={...state.item,[pid]:updatedItem}     
                
            }else {
                updatedCartItem= {...state.item};
                delete updatedCartItem[pid];
            }

            return {
                ...state, 
                item:updatedCartItem,
                totalAmount:state.totalAmount-selectedProduct.productPrice
            }

        case ADD_ORDER:
            return initailState;


    }
    return state;
}