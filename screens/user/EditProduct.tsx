import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState,useEffect,useCallback} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CHeaderButton from '../../components/UI/CHeaherButton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as ProductAction from '../../store/actions/product-action'


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
   
    
    const [title, setTitle] = useState(editedProduct?editedProduct.title:'');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "");
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : 0);
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");
    
   
    const submitHandler=useCallback(()=>{
      
      if(editedProduct){
        dispatch(
          ProductAction.updateProduct(productId,title, description, imageUrl, price)
        );
      }else{
        dispatch(ProductAction.createProduct(title, description, imageUrl, price));
      }
      navigation.goBack(); //after completing go back

      console.log('submitting')
    },[dispatch,productId,title,description,imageUrl,price]);

    useEffect(() => { 
      navigation.setParams({submit:submitHandler})// this is setting params dynamically
     },[submitHandler])

  const {Uform,formControll,label,input} = styles;
  return (
    <ScrollView>
      <View style={Uform}>
        <View style={formControll}>
          <Text style={label}>Title</Text>
          <TextInput
            style={input}
            value={title}
            onChangeText={(text) => {
              
              setTitle(text);
            }}
            autoCapitalize='sentences'
            keyboardType='default'
            returnKeyType='next'
            onEndEditing={()=>{
              console.log('on exit editting')
            }}
          ></TextInput>
        </View>
        <View style={formControll}>
          <Text style={label}>ImageUrl</Text>
          <TextInput
            style={input}
            value={imageUrl}
            onChangeText={(text) => {
              setImageUrl(text);
            }}
          ></TextInput>
        </View>
        <View style={formControll}>
          <Text style={label}>PRICE</Text>
          <TextInput
            style={input}
            value={price.toString()}
            onChangeText={(price) => {
    
              setPrice(parseFloat(price)); //pricing need to be fixed
            }}
            keyboardType='number-pad'
          ></TextInput>
        </View>
        <View style={formControll}>
          <Text style={label}>DESCRIPTION</Text>
          <TextInput
            style={input}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          ></TextInput>
        </View>
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
  action:{

  }
});