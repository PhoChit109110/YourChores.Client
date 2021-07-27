import React, { useState } from 'react';
import { 
    StyleSheet,
     Text,
      View,
       TouchableOpacity,
       Image,
    Dimensions
 } from 'react-native';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants';
import {urgency} from '../global/globalConstants';
const {width} = Dimensions.get('screen');
// room: the room to show in this card
// onPress: what to do when this card is pressed
export default function roomComponent(props) {

    // Decide the urgency color
    var urgencyColor;
    if (props.room.highestUrgency == urgency.Low) {
        urgencyColor = colors.lowUrgency;
    } else if (props.room.highestUrgency == urgency.Medium) {
        urgencyColor = colors.mediumUrgency;
    } else if (props.room.highestUrgency == urgency.High) {
        urgencyColor = colors.highUrgency;
    }


    const styles = StyleSheet.create({
        roomContainer: {
            flexDirection: 'row-reverse',
            margin: 15,
            borderColor: colors.primaryFontColor,
            borderWidth: 1,
            borderStyle: "solid"
          },
          urgencyBar: {
            width: 15,
            backgroundColor: urgencyColor
          },
          textContainer:{
            margin:5,
            flex:1,
          },
          text:{
            ...globalStyles.text,
            textAlign:"center",
            margin:5
          },
          optionsCard: {
            height: 210,
            //width: width / 2 - 30,
            width: 360,
            elevation: 15,
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 20,
            paddingTop: 10,
            paddingHorizontal: 10,
          },
          optionsCardImage: {
            height: 140,
            borderRadius: 10,
            width: '100%',
          },
          optionListsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 20,
          },
          notification:{
            width:20,
            height:20,
            borderRadius: 20,  
            backgroundColor: urgencyColor,
            marginTop: -30,
            marginLeft:310,
            alignItems:'flex-end'
        },
        // notificationText:{
        //     ...globalStyles.text,
        //     fontSize: fontSizes.small,
        //    // textAlign:'left',
        //    // marginLeft:3,
        //     color: colors.primaryBackgroundColor,
        // }
    });

    // What to do when pressed
    const hundlePress = async ()=>{
        await props.onPress(props.room.roomId,props.room.roomName);
    }

    return (
     
             <TouchableOpacity  onPress={hundlePress}>
            {/* <View style={styles.urgencyBar}></View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.room.roomName}</Text>
                <Text style={styles.text}>{`Allow Member To Post: ${props.room.numberOfPendingChores}`}</Text>
            </View> */}

        <View style={styles.optionListsContainer}>
       
          <View style={styles.optionsCard} key={props.room.roomName}>
            {/* House image */}
            <Image source={require('../assets/images/onboardImage.jpg')} style={styles.optionsCardImage} />

            {/* Option title */}
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {props.room.roomName}
            </Text>
            <Text style={{marginTop: 10, fontSize: 12, fontWeight: 'bold'}}>
            {`Allow Member To Post: ${props.room.numberOfPendingChores}`}
            </Text>
           
            <View style={styles.notification}>
                <Text style={styles.notificationText}></Text>
            </View>
          </View>
         
      </View>
        </TouchableOpacity>
    )
}
