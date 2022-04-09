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
    value: props.initialValue ? props.initilaValue : "",
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
    dispatchInput({type:INPUT_CHANGE,val: text ,isValid });
  };

  const lostFocusHandler=() => { 
    dispatchInput({type:INPUT_BLUR});
   }

  const { formControll, label, input } = styles;
  return (
    <View style={formControll}>
      <Text style={label}>{label}</Text>
      <TextInput
        {...props}
        style={input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onEndEditing={() => {
          console.log("on exit editting");
        }}
        onBlur={lostFocusHandler}
      ></TextInput>
      {inputState.IsValid && <Text>Please enter A valid Title</Text>}
    </View>
  );
};

export default input;

const styles = StyleSheet.create({
  formControll: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
