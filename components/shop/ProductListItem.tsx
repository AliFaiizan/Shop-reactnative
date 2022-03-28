
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,TouchableNativeFeedback,Platform } from 'react-native';
import {Color} from "../../constants/Colors";
import Card from '../UI/Card';



export default function ProductListItem({item,onTouch,children}:any) {
  const {container,image,imageContainer,actions,price,detail,title}=styles;
  let Touch:any= TouchableOpacity;
  if(Platform.OS==="android"){
     Touch=TouchableNativeFeedback;
  }else{
      Touch=TouchableOpacity;
  }
  return (
      <Touch onPress={onTouch} activeOpacity={0.2} useForeground>
        <Card style={[container,{backgroundColor:Color.ofwhite}]}>
          <>
          <View style={imageContainer}>
            <Image style={image} source={{uri:item.imageUrl}} />
          </View>

          <View style={detail}>
            <Text style={title}>{item.title}</Text>
            <Text style={price}>${item.price}</Text>
          </View>


          <View style={actions} >
          {children} 
          </View>
            </>
      </Card>
      </Touch>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    margin: 15,
    overflow: 'hidden'
  },
  title:{
    fontSize: 16,
    fontWeight:'bold'
  },
  imageContainer:{
    width: "100%",
    height: "60%",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail:{
    alignItems:'center',
    height:'15%',
    padding:10
  },
  price:{
    fontSize:14,
    color:'#888',
  },
  actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:'25%',
    paddingHorizontal:20
  },
});
