
import PRODUCTS from '../../Data/dummy-data';


const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter((prod) => {
      return prod.id=== prod.ownerid;
    }
    )
}


export default function(state= initialState,action:any){
   

    return state;
};