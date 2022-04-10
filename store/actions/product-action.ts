
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';

//this will delete item from store
export const deleteProduct=(prodId:string) => { 
    return {type:DELETE_PRODUCT,prodId}
}

//action for creating item in store
export const createProduct=(title:string,description:string,imageUrl:string,price:number)=>{

    return (dispatch:Function )=>{

      //any async code you want
    
      dispatch ({
        type:CREATE_PRODUCT,
        productData:{
            title,description,imageUrl,price,
        }
    })
    }

    
}

//for updating existing product in store

export const updateProduct=(id:string,title:string,description:string,imageUrl:string,price:number) => { 
    return {
        type:UPDATE_PRODUCT,
        id,
        productData:{
            title,description,imageUrl,price
        }
    }
 }