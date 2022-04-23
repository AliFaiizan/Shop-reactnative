import { FlatList , Alert, View ,Text} from 'react-native'
import React from 'react'
import ProductListItem from '../../components/shop/ProductListItem'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import CButton from '../../components/shop/Button'
import { Color } from '../../constants/Colors'
import * as productAction from '../../store/actions/product-action' 
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CHeaderButton from '../../components/UI/CHeaherButton'
import { DrawerActions } from '@react-navigation/native'



const UserProductsScreen = ({ navigation }: any) => {
  let dispatch = useDispatch();

  const deleteHandler= (id:string) => {
    Alert.alert("Confirmation","Are you sure you want to delete this item?",[
      {text:'NO',style:'default'},{text:"YES",style:'destructive',onPress:() => {
        dispatch(productAction.deleteProduct(id));
        }}
    ])
  }

  const userProduct = useSelector(
    (state: RootStateOrAny) => state.products.userProducts
  );
    
  if(userProduct.length ===0){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>No Product found , try creating them</Text>
    </View>
  }

  return (
    <FlatList
      data={userProduct}
      renderItem={({ item }) => {
        return (
          <ProductListItem item={item}>
            <CButton
              title="Edit"
              onPress={() => {
                navigation.navigate("EditProduct", {id:item.key});
              }}
              color={Color.Accent}
            />
            <CButton
              title="Delete"
              onPress={deleteHandler.bind(this,item.id)}
              color={Color.Primary}
            />
          </ProductListItem>
        );
      }}
    />
  );
};


export const screenOptions=({navigation}:any) => {
  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="add"
            iconName="create"
            onPress={() => {
              navigation.navigate("EditProduct",{}); //params need to be assigned because we are getting them from edit product screen
            }}
          />
        </HeaderButtons>
      );
    },
  };
}

export default UserProductsScreen

