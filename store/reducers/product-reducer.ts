
import PRODUCTS from '../../Data/dummy-data';


const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter((prod) => {
      return prod.ownerid==='u1';
    }
    )
}


export default function(state= initialState,action:any){
   

    return state;
};