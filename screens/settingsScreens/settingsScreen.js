import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AppLoading  from 'expo-app-loading';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';

import EditableTextBlock from '../../components/editableTextBlock'
import PasswardEditableTextBlock from '../../components/passwardEditableTextBlock'
import { colors } from '../../global/styleConstants';

export default function SettingsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  // Get call to get the user info from the api,
  const getMyInfo = async () => {
    var data = await authGet(ApiRoutes.getMyInfo);
    if (data.success) {
      setFirstName(data.response.firstName);
      setLastName(data.response.lastName);
      setUserName(data.response.userName);
      setEmail(data.response.email);
    }
  }

  // Post call to change the first name
  const changeFirstName = async (value) => {
    var data = await authPost(ApiRoutes.changeName, {
      Firstname: value,
      Lastname: lastName
    });

    if (data.success) {
      setFirstName(value);
    }
  }

  // Post call to change the last name
  const changeLastName = async (value) => {
    var data = await authPost(ApiRoutes.changeName, {
      Firstname: firstName,
      Lastname: value
    });

    if (data.success) {
      setLastName(value);
    }
  }

  // Post call to change the passward
  const changePassward = async (value) => {
    var data = await authPost(ApiRoutes.changePassward, value);

    if (data.success) {
      alert("Passward Change Successfully");
    }
    else {
      var errors = '';
      data.errors.map(error => { errors = errors + error + '\n' });
      alert(errors);
    }
  }

  // Automatic reload when the screen is reentered
 useEffect(() => {
  const unsubscribe = props.navigation.addListener('focus', () => {
    // The screen is focused
    // Call any action
    getMyInfo();

  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [props.navigation]);
  if (loaded)
    return (
      <View style={styles.container}>
        <EditableTextBlock title="First Name:" value={firstName} editable onSave={changeFirstName} />
        <EditableTextBlock title="Last Name:" value={lastName} editable onSave={changeLastName} />
        <EditableTextBlock title="Email:" value={email} />
        <EditableTextBlock title="User Name:" value={userName} />
        <PasswardEditableTextBlock title="Sumit:" editable onSave={changePassward} />
      </View>
    )
  else
    return (
      <AppLoading 
      startAsync={getMyInfo} 
      onFinish={() => setLoaded(true)}
      onError={console.warn}  />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor
  },

});
