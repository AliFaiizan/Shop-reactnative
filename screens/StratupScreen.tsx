import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import React ,{useEffect} from 'react'
import { Color } from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth'
const StratupScreen = () => {

  const dispatch=useDispatch();
   
  
useEffect(() => { 
  const tryLogin=async ()=>{
    const userData=await AsyncStorage.getItem('userData')
    if(!userData){
      dispatch(AuthActions.setDidTryAL())
      return ;
    }
    const {token,userId,expirationDate}=JSON.parse(userData);
    const newDate=new Date(expirationDate);

    if(newDate<= new Date() ||!token || !userId ){
      dispatch(AuthActions.setDidTryAL());
      return ;
    }

    dispatch(AuthActions.authenticate(userId,token))
  }
  tryLogin()
 },[dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Color.Primary} />
    </View>
  )
}

export default StratupScreen

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})