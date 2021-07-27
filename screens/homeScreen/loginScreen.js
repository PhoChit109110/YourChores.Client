import React, { useState } from 'react';
import {
  StyleSheet,View,Text,
  Image, 
  Pressable,
  TouchableWithoutFeedback, Keyboard, SafeAreaView,StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts, fontSizes } from '../../global/styleConstants';
import {screens} from '../../global/globalConstants';
import apiRoutes from '../../global/apiRoutes';
import {post} from '../../global/apiCalls';

import Button from '../../components/customButton';
import TextInput from '../../components/customTextInput';
import KeyboardAvoidingView from '../../components/customKeyboardAvoidingView';

export default function LoginScreen(props) {
  const [userName, setUserName] = useState('');
  const [passward, setPassward] = useState('');

  const hundleLogin = async ()=>{
    var data = await post(apiRoutes.login,{
      UserNameOrEmail:userName,
      Passward: passward
    })

    console.log(data)

    if(data.success)
    {
      console.log("Logged in");

      await AsyncStorage.setItem("TOKEN",data.response.token);
      await AsyncStorage.setItem("USERID",data.response.userId);
      props.setCurrentScreen(screens.DrawerNavigationScreen);
    }
    else
    {
      var errors='';
      data.errors.map(error=>{errors = errors + error + '\n'});
      alert(errors);
    }


    //
  }


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
       <StatusBar translucent backgroundColor={colors.tranparent} />

{/* Onboarding Image */}
<Image
  source={require('../../assets/images/onboardImage.jpg')}
  style={styles.image}
/>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContianer} >
        {/* <Image source={require('../../assets/images/logo.png')} style={styles.logo} /> */}
        <KeyboardAvoidingView style={styles.inputsContainer}>
            <TextInput
              value={userName}
              onChangeText={(value) => setUserName(value)}
              placeholder='User Name' />

            <TextInput
              value={passward}
              onChangeText={(value) => setPassward(value)}
              secureTextEntry
              placeholder='Passward' />

        </KeyboardAvoidingView>
        {/* <View style={styles.buttonContainer}>
          <Button title='Login' onPress={hundleLogin} />          
        </View> */}

          {/* Button container */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          //paddingBottom: 5,
          width:'50%'
        }}>
        {/* button */}
        <Pressable onPress={hundleLogin}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
          
        </Pressable>
        <Pressable onPress={()=>props.setCurrentScreen(screens.SignupSCreen)}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Register</Text>
          </View>
        </Pressable>
      </View>
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 10,
          width:'50%'
        }}>
        {/* button */}
        {/* <Pressable onPress={()=>props.setCurrentScreen(screens.SignupSCreen)}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Register</Text>
          </View>
        </Pressable>
      </View>*/}
        {/* <View style={styles.buttonContainer}>
          <Button title='Register' onPress={()=>props.setCurrentScreen(screens.SignupSCreen)}/>          
        </View> */}
      </View> 
    </TouchableWithoutFeedback>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    alignItems: "center"
  },
  inputsContainer: {
    width:'100%',
  },
  buttonContainer: {
    marginTop: 40,
    height:30,
    width:'45%',
   
  },
  logo: {
    maxHeight: 200,
    maxWidth: '30%',
    resizeMode: "contain"
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
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: 'grey'},
  image: {
    height: 350,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
});
