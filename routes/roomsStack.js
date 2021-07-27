import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../global/globalConstants';

import RoomsScreen from '../screens/roomsScreens/roomsScreen'
import RoomDetailsScreen from '../screens/roomsScreens/roomDetailsScreen'
import RoomSearchScreen from '../screens/roomsScreens/roomSearchScreen'
import RoomSettingsScreen from '../screens/roomsScreens/roomSettingsScreen'
import MemberSearchScreen from '../screens/roomsScreens/memberSearchScreen'
import CustomHeader from '../components/customHeader'
import CustomHeaderWithBack from '../components/customHeaderWithBack'

const Stack = createStackNavigator();

function RoomsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.RoomsScreen}
        component={RoomsScreen}
        options={{
          title: 'Room Screen',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name;

            return (
              <CustomHeader
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        }
      />
      <Stack.Screen
        name={screens.RoomDetailsScreen}
        component={RoomDetailsScreen}
        options={{
          title: 'Details',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
      <Stack.Screen
        name={screens.RoomSearchScreen}
        component={RoomSearchScreen}
        options={{
          title: 'Search',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
      <Stack.Screen
        name={screens.RoomSettingsScreen}
        component={RoomSettingsScreen}
        options={{
          title: 'Setting',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
         <Stack.Screen
        name={screens.MemberSearchScreen}
        component={MemberSearchScreen}
        options={{
          title: 'Member Search',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
    </Stack.Navigator>
  );
}

export default RoomsStack;