import Order from '../../models/order'
import { ADD_ORDER } from '../actions/order-action';

type state={
    orders:Array<Order>
}
const initialState:state={
    orders:[]
}

export default (state=initialState,action:any)=>{

    switch(action.type){
        case ADD_ORDER:
            const newOrder:Order = {
              id: action.orderData.id,
              item: action.orderData.item,
              totalAmount: action.orderData.amount,
              date: action.orderData.date,
            };
         
            return {
                orders:state.orders.concat(newOrder)
            }
    }
    return state;
}