import { View, FlatList, ActivityIndicator , Text} from "react-native";
import React, { FC, useEffect , useState , useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ProductListItem from "../../components/shop/ProductListItem";
import { Color } from "../../constants/Colors";
import * as CartActions from "../../store/actions/cart-actions";
import * as ProductActions from "../../store/actions/product-action";

import CHeaderButton from "../../components/UI/CHeaherButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "@react-navigation/native";
import CButton from "../../components/shop/Button";


const ProductsOverview: FC = (props: any) => {
  let dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState(false)
  const products = useSelector(
    (state: RootStateOrAny) => state.products.availableProducts
  );

   const loadProducts = useCallback(async () => {
     setError(false)
     setIsLoading(true);
     try {
       await dispatch(ProductActions.fetchProducts());
     } catch {
       () => {
         setError(true);
       };
     }
     setIsLoading(false);
   },[dispatch,setIsLoading])
 
   //thsi will be attached after componetn is loaded first time thats why we need another use effect
   useEffect(() => {
     const willFocusSub=props.navigation.addListener("willFocus", () => {
       loadProducts();
     });
     return () => {
       willFocusSub.remove();
     }
   }, [loadProducts]);

   // this will be called when module reloades
  useEffect(() => { 
    loadProducts()
   },[dispatch])
   
   if(error){
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Some Thing Went Wrong</Text>
          <CButton title="Try Again" onPress={loadProducts} />
        </View>
      );
   }

   if(isLoading){
     return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <ActivityIndicator size='large' color={Color.Primary} />
     </View>
   }
   if (isLoading && products.length===0) {
     return (
       <View
         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
       >
         <Text>There are no products</Text>
         <CButton title='Try Again' onPress={loadProducts} />
       </View>
     );
   }
  return (
    <View style={{ backgroundColor: Color.skin }}>
      <FlatList
        data={products}
        renderItem={(itemData) => {
          return (
            <ProductListItem
              item={itemData.item}
              onTouch={() => { props.navigation.navigate("Details",itemData.item) }}
            >
              <CButton
                title="View Detail"
                onPress={() => {
                  props.navigation.navigate("Details", itemData.item);
                }}
                color={Color.Accent}
              />
              <CButton
                title="Add to Cart"
                onPress={() => {
                  dispatch(CartActions.addToCart(itemData.item));
                  props.navigation.navigate("Cart");
                }}
                color={Color.Primary}
              />
            </ProductListItem>
          );
        }}
      />
    </View>
  );
};

export const screenOptions = ({navigation}:any) => {
  
  return {
    headerTitle: "All Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="cart"
            iconName="cart"
            onPress={() => {
              navigation.navigate("Cart")
            }}
          />
        </HeaderButtons>
      );
    },
    
  };
};

export default ProductsOverview;
