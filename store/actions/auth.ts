import { GOOGLE_API } from "../../secrets";


export const SIGN_UP='SING_UP';


export const signUp=(email:any,password:any) => { 
    return async (dispatch:any)=>{

        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${GOOGLE_API}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, returnSecureToken: true }),
          }
        );

        if(!response.ok){
            throw new Error('Something Went wrong')
        }

        const resData= await response.json();

        console.log(resData)

        dispatch({type:SIGN_UP})
    }
 }

 export const login = (email: any, password: any) => {
   return async (dispatch: any) => {
     const response = await fetch(
       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${GOOGLE_API}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password, returnSecureToken: true }),
       }
     );

     if (!response.ok) {
       throw new Error("Something Went wrong");
     }

     const resData = await response.json();

     console.log(resData);

     dispatch({ type: SIGN_UP });
   };
 };