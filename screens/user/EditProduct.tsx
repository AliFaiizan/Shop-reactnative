import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const EditProduct = () => {
    const {form,formControll,label,input} = styles;
  return (
    <ScrollView>
      <View style={form}>
        <View style={formControll}>
          <Text style={label}>Title</Text>
          <TextInput style={input}></TextInput>
        </View>
        <View style={formControll}>
          <Text style={label}>ImageUrl</Text>
          <TextInput style={input}></TextInput>
        </View>
        <View style={formControll}>
          <Text style={label}>PRICE</Text>
          <TextInput style={input}></TextInput>
        </View>
        <View style={formControll}>
          <Text style={label}>DESCRIPTION</Text>
          <TextInput style={input}></TextInput>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProduct

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControll: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
      paddingHorizontal:2,
      paddingVertical:5,
      borderBottomColor:'#ccc',
      borderBottomWidth:1
  },
});