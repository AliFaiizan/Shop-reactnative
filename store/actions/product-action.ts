
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const SET_PRODUCTS='SET_PRODUCTS';

//this will delete item from store
export const deleteProduct=(prodId:string) => { 
    return {type:DELETE_PRODUCT,prodId}
}

export const fetchProducts=() => { 
    return async (dispatch:Function )=>{

    //any async code you want
    const responce = await fetch('https://onlineshop-e7753-default-rtdb.firebaseio.com/products.json')

    const resData= await responce.json();

    const loadedProducts=[];
    for( const key in resData){

        const {title,description,imageUrl,price}=resData[key]
        loadedProducts.push({
          key,
          ownerId:'u1',
          title,
          description,
          imageUrl,
          price,
        });
    }

    dispatch({type:SET_PRODUCTS,products:loadedProducts})

 }}

//action for creating item in store
export const createProduct=(title:string,description:string,imageUrl:string,price:number)=>{

    return async (dispatch:Function )=>{
        console.log({title,description,imageUrl,price})
      //any async code you want
       const responce = await fetch('https://onlineshop-e7753-default-rtdb.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-type':'application.json'
            },
            body:JSON.stringify({
                title,description,imageUrl,price
            })
        })

      const resData= await responce.json();

      
      dispatch ({
        type:CREATE_PRODUCT,
        productData:{
            id:resData.name,title,description,imageUrl,price,
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