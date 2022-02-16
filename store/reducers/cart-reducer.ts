import {ADD_TO_CART}from '../actions/cart-actions';
import CartItem from "../../models/cart-item";


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
    switch (action.type) {
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
    }
    return state;
}