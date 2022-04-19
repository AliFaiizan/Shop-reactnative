import { GOOGLE_API } from "../../secrets";


export const SIGN_UP='SING_UP';
export const LOGIN='LOGIN';


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
            if (!response.ok) {
              const { error } = await response.json();
              let message = "Email Exists";
              if (error.message === "EMAIL_EXISTS") {
                message = "This email already exists";
              } 
              throw new Error(message);
            }
        }

        const resData= await response.json();

        console.log(resData)

        dispatch({type:SIGN_UP , token:resData.idToken, userId:resData.localId})
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
       
      const {error}= await response.json();
     
      let message="Something Went Wrong";
      if(error.message==='EMAIL_NOT_FOUND'){
        message='This email could not be found';
      }else if (error.message === "INVALID_PASSWORD") {
        message = "Passoword in Incorrect";
      }
      throw new Error(message);
     }

     const resData = await response.json();

    

     console.log(resData);

     dispatch({ type: LOGIN, token:resData.idToken, userId:resData.localId });
   };
 };