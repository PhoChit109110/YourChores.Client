import React, { useState } from 'react';
import {
  StyleSheet, View,
  Text, Linking,Pressable,Image,SafeAreaView,StatusBar 
} from 'react-native';

import { colors, fonts, fontSizes, globalStyles} from '../../global/styleConstants';
import { screens } from '../../global/globalConstants';
import Button from '../../components/customButton';


export default function WaitingScreen(props) {


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <StatusBar translucent backgroundColor={colors.tranparent} />

{/* Onboarding Image */}
<Image
source={require('../../assets/images/onboardImage.jpg')}
style={styles.image}
/>
    <View style={styles.mainContianer} >
      <Text style={{fontSize:40,fontWeight:'bold'}}>Information</Text>
      <Text style={globalStyles.text}>{props.message}</Text>
      {/* <Button title="Download" onPress={() => Linking.openURL(props.downloadURL)} />
      {props.allowEntry ? <Button title="Login" onPress={() => props.setCurrentScreen(screens.LoginScreen)} /> : null} */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          //paddingBottom: 5,
          width:'50%'
        }}>
        {/* button */}
        <Pressable onPress={()=>Linking.openURL(props.downloadURL)}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Download</Text>
          </View>
          
        </Pressable>
        {props.allowEntry ?
        <Pressable onPress={()=>props.setCurrentScreen(screens.LoginScreen)}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Go to Login</Text>
          </View>
        </Pressable>:null}
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:30
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: colors.accent1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  image: {
    height: 350,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
});