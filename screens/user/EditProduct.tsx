import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useCallback, useReducer } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CHeaderButton from "../../components/UI/CHeaherButton";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import * as ProductAction from "../../store/actions/product-action";
import Cinput from "../../components/UI/input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

type fState = {
  inputValues: {
    title: string;
    imageUrl: string;
    price: string;
    description: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
  };
  formIsValid: boolean;
};

const formReducer = (state: any, action: any): fState => {
  if (action.type === "FORM_INPUT_UPDATE") {
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

const EditProduct = ({ route, navigation }: any) => {
  const productId = route.params.id;
  const dispatch = useDispatch();
  //console.log(params)

  const editedProduct = useSelector((state: RootStateOrAny) => {
    return state.products.userProducts.find((prod: any) => {
      return prod.id === productId;
    });
  });

  //console.log(editedProduct)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: editedProduct ? editedProduct.price : "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: true,
  });
   const { title, description, imageUrl, price } = formState.inputValues;

  const submitHandler = useCallback(() => {
    const { title, description, imageUrl, price } = formState.inputValues;
    console.log({title,description,imageUrl,price})
    if (!formState.formIsValid) {
      Alert.alert("Failed to Submit", "input you entered is invalid", [
        { text: "ok" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        ProductAction.updateProduct(
          productId,
          title,
          description,
          imageUrl,
          Number(price)
        )
      );
    } else {
      dispatch(
        ProductAction.createProduct(title, description, imageUrl, Number(price))
      );
    }
    navigation.goBack(); //after completing go back

    console.log("submitted");
  }, [dispatch, productId,title,description,imageUrl,price]);
   
  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
     // this is setting params dynamically
    
  }, [submitHandler]);

  const textChangeHandler = useCallback((
    inputValue: any,
    inputValidity: boolean,
    inputIdentifier: string,
  ) => {
    console.log({inputValue,inputValidity,ths:formState.formIsValid})
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  },[dispatchFormState])

  const { Uform } = styles;

  return (
    <ScrollView>
      <View style={Uform}>
        <Cinput
          id="title"
          label="Title"
          errorText="Please Enter Valid Title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={textChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Cinput
          id="imageUrl"
          label="ImageUrl"
          errorText="Please Enter Valid ImageURL"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={textChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Cinput
          id="price"
          label="Price"
          errorText="Please Enter Valid Price"
          keyboardType="decimal-pad"
          autoCapitalize="sentences"
          returnKeyType="next"
          onInputChange={textChangeHandler}
          initialValue={editedProduct ? editedProduct.price.toString() : ""}
          required
          min={0.1}
        />
        <Cinput
          id="description"
          label="Description"
          errorText="Please Enter Valid Description"
          keyboardType="default"
          autoCapitalize="sentences"
          onInputChange={textChangeHandler}
          autoCorrect
          multiline
          numberOfLines={3}
          initialValue={editedProduct ? editedProduct.description : ""}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
};

export const screenOptions = ({ route, navigation }: any) => {
 


  return {
    headerTitle: route.params ? "Edit Product" : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="Save"
            iconName="save"
            onPress={() => {
              //work remaining
              route.params.submit();
              navigation.navigate("Admin");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default EditProduct;

const styles = StyleSheet.create({
  Uform: {
    margin: 20,
  },
  
});
