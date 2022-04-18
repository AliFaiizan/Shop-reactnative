export const SIGN_UP='SING_UP';


export const signUp=(email:any,password:any) => { 
    return async (dispatch:any)=>{

        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBVPoG6pdMe6PTWWO1zrm-6RwaNb9mosE",
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