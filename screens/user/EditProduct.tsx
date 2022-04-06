import { ScrollView, StyleSheet, Text, TextInput, View , Alert } from 'react-native'
import React, {useEffect,useCallback , useReducer} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CHeaderButton from '../../components/UI/CHeaherButton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as ProductAction from '../../store/actions/product-action'
import Cinput from '../../components/UI/input';


const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';

type fState = {
  inputValues: {title:string,imageUrl:string,price:string,description:string};
  inputValidities:{title:boolean,imageUrl:boolean,price:boolean,description:boolean};
  formIsValid: boolean;
};

const formReducer=(state:any,action:any): fState =>  {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues={
      ...state.inputValues,
      [action.input]:action.value,

    }
    const updatedValidities={
      ...state.inputValidities,
      [action.input]:action.isValid
    }
    let updatedFormIsValid=true;

    for (const key in updatedValidities){
      updatedFormIsValid=updatedFormIsValid&& updatedValidities[key];
    }
     return {
       inputValues: updatedValues,
       inputValidities:updatedValidities,
       formIsValid:updatedFormIsValid
     };
  }
  return state;
 
}

const EditProduct = ({route,navigation}:any) => {
    const productId = route.params.id;
    const dispatch = useDispatch();
    //console.log(params)

    const editedProduct = useSelector((state: RootStateOrAny) => {
        
          return state.products.userProducts.find((prod: any) => {
            return prod.id === productId;
          });
       
        
      });
  
    //console.log(editedProduct)
    

     const [formState,dispatchFormState] = useReducer(formReducer,
       {
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
       formIsValid: editedProduct?true:false,
      })
   
    
   
   
    const submitHandler=useCallback(()=>{

      const {title,description,imageUrl,price}=formState.inputValues;
      if(!formState.formIsValid){
        Alert.alert('Failed to Submit','input you entered is invalid',[{text:'ok'}])
        return
      }
      if(editedProduct){
        dispatch(
          ProductAction.updateProduct(productId,title, description, imageUrl, Number(price))
        );
      }else{
        dispatch(ProductAction.createProduct(title, description, imageUrl, Number(price)));
      }
      navigation.goBack(); //after completing go back

      console.log('submitting')
    },[dispatch,productId,formState]);

    useEffect(() => { 
      navigation.setParams({submit:submitHandler})// this is setting params dynamically
     },[submitHandler])

     const textChangeHandler=(inputIdentifier:string,text:string,) => {
      let isValid=false;
        if(text.trim().length>=0){
           isValid=true;
        }else{
         
        }
       dispatchFormState({type: FORM_INPUT_UPDATE,val:text,isValid,inputId:inputIdentifier})
     }
 const {Uform} = styles;
 
  return (
    <ScrollView>
      <View style={Uform}>
        <Cinput
          label="Title"
          errorText="Please Enter Valid Title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
        />
        <Cinput
          label="ImageUrl"
          errorText="Please Enter Valid ImageURL"
          keyboardType="default"
          returnKeyType="next"
        />
        <Cinput
          label="Price"
          errorText="Please Enter Valid Price"
          keyboardType="decimal-pad"
          autoCapitalize="sentences"
          returnKeyType="next"
        />
        <Cinput
          label="Description"
          errorText="Please Enter Valid Description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );
}

export const screenOptions=({route,navigation}:any) => {
    let submitFunction:Function

    submitFunction = route.params.submit; 
  
 console.log(route.params);
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
                submitFunction();
                navigation.navigate("Admin");
              }}
            />
          </HeaderButtons>
        );
      }, 
    };
}

export default EditProduct;

const styles = StyleSheet.create({
  Uform: {
    margin: 20,
  },
  action:{

  }
});