
import PRODUCTS from '../../Data/dummy-data'; 
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/product-action';
import Product from '../../models/product';

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
        const newProduct: Product = {
          id: "u1",
          ownerid:'p1',
          title: action.productData.title,
          description: action.productData.description,
          imageUrl: action.productData.imageUrl,
          price: action.productData.price
        };
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