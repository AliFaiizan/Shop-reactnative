import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState,useEffect,useCallback} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CHeaderButton from '../../components/UI/CHeaherButton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as ProductAction from '../../store/actions/product-action'


const EditProduct = ({route,navigation}:any) => {
    const params = route.params;
    const dispatch = useDispatch();
    //console.log(params)
    let editedProduct;
      editedProduct = useSelector((state: RootStateOrAny) => {
        if(params){
          return state.products.userProducts.find((prod: any) => {
            return prod.id === params.id;
          });
        }
        
      });
  
    //console.log(editedProduct)
   
    
    const [title, setTitle] = useState(params?params.title:'');
    const [imageUrl, setImageUrl] = useState(params ? params.imageUrl : "");
    const [price, setPrice] = useState(params ? params.price : 0);
    const [description, setDescription] = useState(params ? params.description : "");
    
   
    const submitHandler=useCallback(() => {

      if(params){
        dispatch(ProductAction.createProduct(title,description,imageUrl,price))
      }
      console.log('submitting')
    },[]);

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
    
  if(route.params){
    submitFunction = route.params.submit; 
  }
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