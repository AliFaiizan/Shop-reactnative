import Product from "../../models/product";


export const ADD_TO_CART='ADD_TO_CART';
export const DELETE_FROM_CART='DELETE_FROM_CART';

export const addToCart=(product:Product)=>{
    return {type:ADD_TO_CART,product}
};

export const deleteFromCart=(id:any) => { 
    return {type:DELETE_FROM_CART,pid:id} 
}