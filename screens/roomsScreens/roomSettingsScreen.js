import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity ,Alert} from 'react-native';
import AppLoading  from 'expo-app-loading';
import { MaterialIcons } from '@expo/vector-icons';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens, joinRequestType } from '../../global/globalConstants';

import IconButton from '../../components/customIconButton'
import TextInput from '../../components/customTextInput'
import CheckBox from '../../components/customCheckBoxComponent'
import CollabsablePanel from '../../components/customCollabsablePanelComponent'
import MemberComponent from '../../components/memberComponent'
export default function RoomDetailsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const [allowMembersToPost, setAllowMmebersToPost] = useState(false);
  const [newAllowMembersToPost, setNewAllowMmebersToPost] = useState(false);

  const [owners, setOwners] = useState([]);
  const [members, setMembers] = useState([]);
  const [joinRequests,setJoinRequests] = useState([]);
  const [invitations, setInvitations] = useState([]);



  // Get call to get the user info from the api,
  const getRoomDetails = async () => {
    var data = await authGet(ApiRoutes.getRoomDetails(props.route.params.roomId));

    if (data.success) {
      setCurrentUserId(await AsyncStorage.getItem("USERID"));

      setAllowMmebersToPost(data.response.allowMembersToPost);
      setNewAllowMmebersToPost(data.response.allowMembersToPost);

      setMembers(await data.response.roomMembers.filter(roomMember => !roomMember.isOwner));
      setOwners(await data.response.roomMembers.filter(roomMember => roomMember.isOwner));
      setJoinRequests(await data.response.joinRequests.filter(joinRequest => joinRequest.joinRequestType == joinRequestType.Join))
      setInvitations(await data.response.joinRequests.filter(joinRequest => joinRequest.joinRequestType == joinRequestType.Invite))
    }
  }

  const updateRoom = async () => {
    var data = await authPost(ApiRoutes.updateRoom, {
      "roomId": props.route.params.roomId,
      "allowMembersToPost": newAllowMembersToPost
    });

    if (data.success) {
      getRoomDetails();
    }
  }

  const kickMember = async (userId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to kick member",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok', onPress: async () => {
            var data = await authPost(ApiRoutes.kickMember, {
              "roomId": props.route.params.roomId,
              "userId": userId
            });

            if (data.success) {
              getRoomDetails();
            }
            else {
              var errors = '';
              data.errors.map(error => { errors = errors + error + '\n' });
              alert(errors);
            }
          }
        },
      ]
    )

  }

  const promoteMember = async (userId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to promote member",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok', onPress: async () => {
            var data = await authPost(ApiRoutes.promoteMember, {
              "roomId": props.route.params.roomId,
              "userId": userId
            });
        
            if (data.success) {
              getRoomDetails();
            }
            else {
              var errors = '';
              data.errors.map(error => { errors = errors + error + '\n' });
              alert(errors);
            }
          }
        },
      ]
    )

   
  }

  const demoteOwner = async (userId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to demote member",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok', onPress: async () => {
            var data = await authPost(ApiRoutes.demoteOwner, {
              "roomId": props.route.params.roomId,
              "userId": userId
            });
        
            if (data.success) {
              if (currentUserId == userId) {
                props.navigation.pop();
                props.route.params.refresh();
        
              }
              else {
                getRoomDetails();
        
              }
        
            }
            else {
              var errors = '';
              data.errors.map(error => { errors = errors + error + '\n' });
              alert(errors);
            }
          }
        },
      ]
    )
   
  }
  const acceptRequest = async (requestId) => {

    Alert.alert(
      "Confirmation",
      "Are you sure you want to accept member",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok', onPress: async () => {
            var data = await authPost(ApiRoutes.acceptRequest, {
              "roomId": props.route.params.roomId,
              "joinRequestId": requestId
            });
        
            if (data.success) {
              getRoomDetails();
            }
            else {
              var errors = '';
              data.errors.map(error => { errors = errors + error + '\n' });
              alert(errors);
            }
          }
        },
      ]
    )
    
  }
  const declineRequest = async (requestId) => {

    Alert.alert(
      "Confirmation",
      "Are you sure you want to decline request",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok', onPress: async () => {
            var data = await authPost(ApiRoutes.declineRequest, {
              "roomId": props.route.params.roomId,
              "joinRequestId": requestId
            });
        
            if (data.success) {
              getRoomDetails();
            }
            else {
              var errors = '';
              data.errors.map(error => { errors = errors + error + '\n' });
              alert(errors);
            }     
          }
        },
      ]
    )
    
  }
  const cancelInvitation = async (requestId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to cancel invitation",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok', onPress: async () => {
            var data = await authPost(ApiRoutes.cancelInvitation, {
              "roomId": props.route.params.roomId,
              "joinRequestId": requestId
            });
        
            if (data.success) {
              getRoomDetails();
            }
            else {
              var errors = '';
              data.errors.map(error => { errors = errors + error + '\n' });
              alert(errors);
            }       
          }
        },
      ]
    )
   
  }

  const findMember = async () => {
    props.navigation.navigate(screens.MemberSearchScreen,{roomId:props.route.params.roomId});
  }

  if (loaded)
    return (
      <View style={styles.container}>
        <View style={styles.container}>

          <View style={styles.headerContainer}>
            <CheckBox title="Allow Member To Post" value={newAllowMembersToPost} onPress={(value) => setNewAllowMmebersToPost(value)} />
            {allowMembersToPost != newAllowMembersToPost ? <IconButton style={styles.icon} icon="save" onPress={updateRoom} /> : null}
          </View>

          <CollabsablePanel title="Room Owner">
            <FlatList
              data={owners}
              keyExtractor={item => item.userId}
              renderItem={({ item }) => {
                var buttons = [];
                buttons.push({ icon: "arrow-downward",backgroundColor:colors.glaucous, method: demoteOwner });
                if (currentUserId != item.userId) {
                  buttons.push({ icon: "remove-circle-outline",backgroundColor:colors.redOrange, method: kickMember });
                }

                return (
                  <MemberComponent member={item} buttons={buttons} />
                );
              }
              }
            />
          </CollabsablePanel>

          <CollabsablePanel title="Room Member">
            <FlatList
              data={members}
              keyExtractor={item => item.userId}
              renderItem={({ item }) => {
                var buttons = [];
                buttons.push({ icon: "arrow-upward",backgroundColor:colors.shamrockGreen, method: promoteMember });
                buttons.push({ icon: "remove-circle-outline",backgroundColor:colors.redOrange, method: kickMember });

                return (
                  <MemberComponent member={item} buttons={buttons} />
                );
              }
              }
            />
          </CollabsablePanel>
          <CollabsablePanel title="Request">
            <FlatList
              data={joinRequests}
              keyExtractor={item => item.userId}
              renderItem={({ item }) => {
                var buttons = [];
                buttons.push({ icon: "clear", method: declineRequest });
                buttons.push({ icon: "check",backgroundColor:colors.shamrockGreen, method: acceptRequest });

                return (
                  <MemberComponent member={item} buttons={buttons} paramSelector={(member)=>member.joinRequestId} />
                );
              }
              }
            />
          </CollabsablePanel>
          <CollabsablePanel title="Invitation">
            <FlatList
              data={invitations}
              keyExtractor={item => item.userId}
              renderItem={({ item }) => {
                var buttons = [];
                buttons.push({ icon: "clear",backgroundColor:colors.redOrange, method: cancelInvitation });

                return (
                  <MemberComponent member={item} buttons={buttons} paramSelector={(member) => member.joinRequestId} />
                );
              }
              }
            />
          </CollabsablePanel>
        </View>

        <View style={styles.buttonContainer}>
          <IconButton icon="group-add" onPress={findMember} />

        </View>
      </View>
    )
  else
    return (
      <AppLoading startAsync={getRoomDetails} 
      onFinish={() => setLoaded(true)}
      onError={console.warn} />
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderColor: colors.accent1,
    borderStyle: "solid",
    borderWidth: 1
  },
  icon: {
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  text: {
    ...globalStyles.text,
    padding: 10
  },
  buttonContainer: {
    marginTop: -70,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
});
