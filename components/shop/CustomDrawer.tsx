import { StyleSheet, Text, TextInput, View ,Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Color } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const CustomDrawer = (props:any) => {

  const {container,header,itemList,
    search,profile,image,
    profileText,bottom}=styles;

  return (
    <View style={container}>
      <DrawerContentScrollView>
        <View style={header}>
          <View style={profile}>
            <Image
              style={image}
              source={require("../../assets/Images/SS.jpg")}
            />
            <Text style={profileText}>Faizan Ahmed</Text>
          </View>

          <View style={search}>
            <Ionicons style={{ paddingLeft: 10 }} name="search" size={16} />
            <TextInput
              style={{ width: 200, marginLeft: 10, marginRight: 10 }}
              placeholder="SEARCH"
            />
          </View>
        </View>
        <View style={itemList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={bottom}>
        <Text style={{fontWeight:'bold'}}>Follow Us On</Text>
        <View style={{width:'50%',flexDirection:'row',paddingTop:10,justifyContent:'space-around'}}>
          <Ionicons name="logo-twitter" size={25} />
          <Ionicons name="logo-instagram" size={25} />
          <Ionicons name="logo-youtube" size={25} />
        </View>
      </View>
    </View>
  );
}

export default CustomDrawer

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    alignItems:'center',
    justifyContent:'center',
    height:150,
    
  },
  itemList:{
    marginTop:15,
  },
  search:{
    flexDirection:'row',
    alignItems:'center',
    elevation:8,
    width:'80%',
    height:40,
    borderRadius:5,
    backgroundColor:Color.ofwhite,
  },
  image:{
    width:70,
    height:70,
    borderRadius:50,
    overflow:'hidden',
  },
  profile:{
    width:'80%',
    flexDirection:'row',
    paddingBottom:10,

  },
  profileText:{
    paddingTop:20,
    paddingLeft:15,
    fontSize:16,
    fontWeight:'bold'
  },
  bottom:{
    alignItems:'center',
    justifyContent:'center',
    height:100,
   
  }
})