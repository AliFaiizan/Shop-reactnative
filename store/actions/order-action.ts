export const ADD_ORDER='ADD_ORDER';

export const add_Order=(cartItem:any,totalAmount:any)=>{

    return {
        type:ADD_ORDER,
        orderData:{
            item:cartItem,amount:totalAmount
        }
    }
}