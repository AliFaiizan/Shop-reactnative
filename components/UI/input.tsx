import { StyleSheet, Text, TextInput, View  } from 'react-native'
import React from 'react';

const inputReducer=(state,action)=>{};

const input = (props:any) => {

  const textChangeHandler=(text:any)=>{

  }

     const { formControll, label, input } = styles;
  return (
    <View style={formControll}>
      <Text style={label}>{label}</Text>
      <TextInput
        {...props}
        style={input}
        value={formState.inputValues.title}
        onChangeText={textChangeHandler.bind(this, "title")}
        onEndEditing={() => {
          console.log("on exit editting");
        }}
      ></TextInput>
      {formState.formIsValid && <Text>Please enter A valid Title</Text>}
    </View>
  );
}

export default input

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