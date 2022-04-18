import { StyleSheet, Text, View , ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import CInput from '../../components/UI/input';
import Card from '../../components/UI/Card';
import CButton from '../../components/shop/Button';
import { Color } from '../../constants/Colors';


const AuthScreen = () => {

    //styles deconsturct
    const {authContainer,Cscreen,buttonContainer}=styles;
  return (
    <KeyboardAvoidingView
        enabled
      behavior="padding"
      keyboardVerticalOffset={50}
      style={Cscreen}
    >
      <Card style={[authContainer, { backgroundColor: Color.ofwhite }]}>
        <ScrollView>
          <CInput
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please Enter a Valid Email Address"
            onInputChange={() => {}}
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
            errorMessage="Please Enter a Valid Password"
            onInputChange={() => {}}
            initialValue=""
          />
          <View style={buttonContainer}>
            <CButton title="Login" color={Color.Primary} onPress={() => {}} />
            <CButton title="SignUp" color={Color.Accent} onPress={() => {}} />
          </View>
        </ScrollView>
      </Card>
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
    paddingTop:20,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    
  },
  buttonContainer:{
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  }
});