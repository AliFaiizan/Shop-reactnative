
import PRODUCTS from '../../Data/dummy-data'; 
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/product-action';


const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter((prod) => {
      return prod.ownerid==='u1';
    }
    )
}


export default function(state= initialState,action:any){
   
    switch (action.type) {
      case DELETE_PRODUCT:
        return {
          ...state,
          userProducts: state.userProducts.filter((prod) => {
            return prod.id !== action.prodId;
          }),
          availableProducts: state.availableProducts.filter((prod) => {
            return prod.id !== action.prodId;
          }),
        };
      case CREATE_PRODUCT:
        return {
          ...state,
          userProducts: state.userProducts.filter((prod) => {
            return prod.id !== action.prodId;
          }),
          availableProducts: state.availableProducts.filter((prod) => {
            return prod.id !== action.prodId;
          }),
        };
      case UPDATE_PRODUCT:
        return {
          ...state,
          userProducts: state.userProducts.filter((prod) => {
            return prod.id !== action.prodId;
          }),
          availableProducts: state.availableProducts.filter((prod) => {
            return prod.id !== action.prodId;
          }),
        };
    }

    return state;
};