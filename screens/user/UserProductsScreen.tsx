import { FlatList } from 'react-native'
import React from 'react'
import ProductListItem from '../../components/shop/ProductListItem'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import CButton from '../../components/shop/Button'
import { Color } from '../../constants/Colors'
import * as CartAction from '../../store/actions/product-action' 
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CHeaderButton from '../../components/UI/CHeaherButton'
import { DrawerActions } from '@react-navigation/native'



const UserProductsScreen = ({ navigation }: any) => {
  let dispatch = useDispatch();

  const userProduct = useSelector(
    (state: RootStateOrAny) => state.products.userProducts
  );

  return (
    <FlatList
      data={userProduct}
      renderItem={({ item }) => {
        return (
          <ProductListItem item={item}>
            <CButton
              title="Edit"
              onPress={() => {
                navigation.navigate("EditProduct", {id:item.id});
              }}
              color={Color.Accent}
            />
            <CButton
              title="Delete"
              onPress={() => {
                dispatch(CartAction.deleteProduct(item.id));
              }}
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

