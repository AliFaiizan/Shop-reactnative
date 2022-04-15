import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useCallback, useReducer , useState} from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CHeaderButton from "../../components/UI/CHeaherButton";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import * as ProductAction from "../../store/actions/product-action";
import Cinput from "../../components/UI/input";
import { Color } from "../../constants/Colors";

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

  const [isLoading,setIsLoading]=useState(false);
  const [isError, setError] = useState("");
  const productId = route.params.id;
  const dispatch = useDispatch();
  //console.log(params)

  const editedProduct = useSelector((state: RootStateOrAny) => {
    return state.products.userProducts.find((prod: any) => {
      return prod.id === productId;
    });
  });

  //console.log(editedProduct)

  setIsLoading(true);
  setError("")

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
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if(isError){
      Alert.alert("An Error Accoured!",isError,[{text:'Okay'}])
    }

  }, [isError])
  

  const submitHandler = useCallback(async() => {
    const { title, description, imageUrl, price } = formState.inputValues;
      
    if (!formState.formIsValid) {
      Alert.alert("Failed to Submit", "input you entered is invalid", [
        { text: "ok" },
      ]);
      return;
    }
    try {
      if (editedProduct) {
        await dispatch(
          ProductAction.updateProduct(
            productId,
            title,
            description,
            imageUrl,
            Number(price)
          )
        );
      } else {
        await dispatch(
          ProductAction.createProduct(
            title,
            description,
            imageUrl,
            Number(price)
          )
        );
      }
      navigation.goBack();
    } catch (error:any) {
      setError(error.message)
    }
    
    //after completing go back

    console.log("submitted");
  }, [dispatch, productId,formState]);
   
  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
     // this is setting params dynamically
    
  }, [submitHandler]);

  const textChangeHandler = useCallback((
    inputValue: any,
    inputValidity: boolean,
    inputIdentifier: string,
  ) => {
    
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  },[dispatchFormState])


  const { Uform ,centered} = styles;



  if(isLoading){
    <View style={centered}>
      <ActivityIndicator size='large' color={Color.Primary} />
    </View>
  }

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
  centered:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
  
});
