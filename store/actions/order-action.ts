export const ADD_ORDER='ADD_ORDER';

export const add_Order=(cartItem:any,totalAmount:any)=>{

    return async (dispatch:any)=>{

        const date= new Date().toISOString();

          try {
         const responce = await fetch(
           "https://onlineshop-e7753-default-rtdb.firebaseio.com/orders/u1.json",
           {
             method: "POST",
             headers: {
               "Content-type": "application.json",
             },
             body: JSON.stringify({
             cartItem,
             totalAmount,
             date
             }),
           }
         );

        const resData = await responce.json();

        dispatch({
        type: ADD_ORDER,
        orderData: {
            id:resData.name,
            item: cartItem,
            amount: totalAmount,
            date
        },

        });
          } catch {
            (err: any) => {
              console.log(err);
            };
          }

      
    }
}