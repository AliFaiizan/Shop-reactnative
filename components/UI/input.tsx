import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useReducer , useEffect } from "react";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return{
        ...state,
        touched:true,
      }

      default:
      return state;
  }
};

const input = (props: any) => {


  const [inputState, dispatchInput] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id}=props;

  useEffect(() => {
    
    if(inputState.touched){
      onInputChange(inputState.value,inputState.isValid,id)
    }
  
  }, [inputState,onInputChange])
  

  const textChangeHandler = (text: any) => {
    const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid=true;
    if(props.required&&text.trim().length===0){
      isValid=false;
    }
    if(props.email && !emailRegex.test(text.toLowerCase())){
      isValid=false;
    }
    if(props.min != null && +text>props.max){
      isValid=false;
    }
    if(props.max != null && +text<props.min){
      isValid=false;
    }
    if(props.minLength != null && text.length<props.minLength ){
      isValid=false;
    }
    dispatchInput({type:INPUT_CHANGE,value: text ,isValid });
  };

  const lostFocusHandler=() => { 
    dispatchInput({type:INPUT_BLUR});
   }
   
  const { formControll, lbl, input , errorContainer,errorText } = styles;
  return (
    <View style={formControll}>
      <Text style={lbl}>{props.label}</Text>
      <TextInput
        {...props}
        style={input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onEndEditing={() => {
          //on end editing
        }}
        onBlur={lostFocusHandler}
      ></TextInput>
      {!inputState.isValid && inputState.touched && (
        <View style={errorContainer}>
          <Text style={errorText}>Please enter A valid {props.label}</Text>
        </View>
      )}
    </View>
  );
};

export default input;

const styles = StyleSheet.create({
  formControll: {
    width: "100%",
  },
  lbl: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer:{
    marginVertical:5,
  },
  errorText:{
    fontFamily:'open-sans',
    color:'red',
    fontSize:13
  }
});
