
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const SET_PRODUCTS='SET_PRODUCTS';

//this will delete item from store
export const deleteProduct=(prodId:string) => { 
     return async(dispatch:Function,state:any)=>{
    const token = state().auth.token;
    const response=await fetch(
    `https://onlineshop-e7753-default-rtdb.firebaseio.com/products/${prodId}.json?auth=${token}`,
    {
        method: "DELETE",
    });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
        
    dispatch({type:DELETE_PRODUCT,prodId})
}}

export const fetchProducts=() => { 
    return async (dispatch:Function,state:any )=>{
        //error handling
        const token = state().auth.token;
        const userId= state().auth.userId;
        try{
             const responce = await fetch(
               `https://onlineshop-e7753-default-rtdb.firebaseio.com/products.json?auth=${token}`
             );
            if(!responce.ok){
                throw new Error('something went wrong')
            }
             const resData = await responce.json();
             
             const loadedProducts = [];
             for (const key in resData) {
               const { title, description, imageUrl, price ,ownerId} = resData[key];
               loadedProducts.push({
                 key,
                 ownerId,
                 title,
                 description,
                 imageUrl,
                 price,
               });
             }

             dispatch({ type: SET_PRODUCTS, products: loadedProducts ,userProducts:loadedProducts.filter((prod) => { prod.ownerId===userId })});
        }catch {(err:any) => { console.log(err) }}
    //any async code you want
   

 }}

//action for creating item in store
export const createProduct=(title:string,description:string,imageUrl:string,price:number)=>{

    return async (dispatch: Function, state: any) => {
       const token = state().auth.token;
       const userId = state().auth.userId;
      console.log({ title, description, imageUrl, price });
      //any async code you want
      const responce = await fetch(
        `https://onlineshop-e7753-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application.json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId:userId
          }),
        }
      );

      const resData = await responce.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId:userId
        },
      });
    };

    
}

//for updating existing product in store

export const updateProduct=(id:string,title:string,description:string,imageUrl:string,price:number) => { 
    
    return async (dispatch: Function, state: any) => {
      const token = state().auth.token;
      const response = await fetch(
        `https://onlineshop-e7753-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application.json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        id,
        productData: {
          title,
          description,
          imageUrl,
          price,
        },
      });
    };}