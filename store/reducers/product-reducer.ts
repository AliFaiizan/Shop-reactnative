
import PRODUCTS from '../../Data/dummy-data'; 
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/product-action';
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
      case SET_PRODUCTS:
        return{
          availableProducts:action.products,
          userProducts:action.products.filter((prod:any) => { return prod.id=== 'u1' })
        }
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
          id: action.productData.id,
          ownerid:'u1',
          title: action.productData.title,
          description: action.productData.description,
          imageUrl: action.productData.imageUrl,
          price: action.productData.price
        };
        //concat new prduct to user product
        //do same with available products
        return {
          ...state,
          userProducts: state.userProducts.concat(newProduct),
          availableProducts: state.availableProducts.concat(newProduct)
        };
      case UPDATE_PRODUCT:
        const productIndex= state.userProducts.findIndex((prod) => { return prod.id===action.id })
      //find the product with id
      const updatedProduct: Product = {
        id: action.id,
        ownerid:'u1',
        title: action.productData.title,
        description: action.productData.description,
        imageUrl: action.productData.imageUrl,
        price:action.productData.price
      };
      console.log(updatedProduct)
      //replace it contents// of find and remove than concat new data.
      const updatedUserProducts=[...state.userProducts];
      updatedUserProducts[productIndex]=updatedProduct;

      const availableProductsIndex = state.availableProducts.findIndex((prod) => {
        return prod.id === action.id;
      });
      const updatedAvailableProducts=[...state.availableProducts];
      updatedAvailableProducts[availableProductsIndex]=updatedProduct;
        return {
          ...state,
          userProducts:updatedUserProducts,
          availableProducts: updatedAvailableProducts
        };
    }

    return state;
};