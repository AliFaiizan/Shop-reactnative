import { StyleSheet, Text, View , ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import React ,{useReducer , useCallback , useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import CInput from '../../components/UI/input';
import Card from '../../components/UI/Card';
import CButton from '../../components/shop/Button';
import { Color } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth';

type fState = {
  inputValues: {
    email:string,
    password:string
  };
  inputValidities: {
   email:boolean,
   password:boolean
  };
  formIsValid: boolean;
};
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state: any, action: any): fState => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};




const AuthScreen = () => {

    const dispatch=useDispatch();

    const [isSingUp,setIsSignUp]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email:'',
        password:''
      },
      inputValidities: {
        email:false,
        password:false
      },
      formIsValid: false,
    });


    useEffect(() => {
      if(error){
        Alert.alert("Error",error,[{text:'ok'}])
      }
    }, [error]);

    const authHandler= async() => {
      let action;
      if(isSingUp){
        action=authActions.signUp(formState.inputValues.email,formState.inputValues.password)
       }else{
         action=authActions.login(formState.inputValues.email,formState.inputValues.password)
       }
       setError(null)
       setIsLoading(true);
       try{
         await dispatch(action)
        }catch(err:any){
          setError(err.message)
        }
        setIsLoading(false);
       }

  const textChangeHandler = useCallback(
    (inputValue: any, inputValidity: boolean, inputIdentifier: string) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
    

    //styles deconsturct
    const {authContainer,Cscreen,buttonContainer,gradient}=styles;
  return (
   <KeyboardAvoidingView behavior='height'  style={Cscreen}>
      <LinearGradient colors={["#E5E2AC", "#3E5151"]} style={gradient}>
        <Card style={[authContainer, { backgroundColor: Color.ofwhite }]}>
          <ScrollView>
            <CInput
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please Enter a Valid Email Address"
              onInputChange={textChangeHandler}
              initialValue=""
            />

            <CInput
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please Enter a Valid Password"
              onInputChange={textChangeHandler}
              initialValue=""
            />
            <View style={buttonContainer}>
              {isLoading?<ActivityIndicator size='small' color={Color.Primary}/>:<CButton title={isSingUp?'SingUp':"Login"} color={Color.Primary} onPress={authHandler} />}
            </View>
            <View style={buttonContainer}>
              <CButton title={`Switch to ${isSingUp?"Login":"SingUp"}`} color={Color.Accent} onPress={() => {
                setIsSignUp(prevState=>!prevState)
              }} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;


export const screenOptions=() => {
    return{
        headerTitle:'Authenticate',
    }
}

const styles = StyleSheet.create({
  Cscreen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});