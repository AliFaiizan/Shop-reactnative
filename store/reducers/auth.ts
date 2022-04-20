import { AUTHENTICATE} from "../actions/auth"

const initialState={
    token:null,
    userId:null,
    didTryAutoLogin:false,
}

export default (state=initialState,action:any)=>{
    switch(action.type){
        case AUTHENTICATE:
            return{
                token:action.token,
                userId:action.userId
            }
        // case SIGN_UP:
        //     return{
        //         token:action.token,
        //         userId:action.userId
        //     }

        default: 
            return state;
        
    }
}