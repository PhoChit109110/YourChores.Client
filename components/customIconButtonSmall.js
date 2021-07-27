import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors, fonts, fontSizes } from '../global/styleConstants'

export default function CustomIconButton(props) {

    const styles = StyleSheet.create({
        button: {
            padding: 10,
            width:40,
            height:40,
            backgroundColor: colors.accent1,
            justifyContent:'center',
            borderRadius: 40,            
            ...props.style,
        },
        iconStyle:{
            textAlign:"center"
        }
    });
    
    
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <MaterialIcons style={styles.iconStyle} name={props.icon} size={fontSizes.small} color={colors.primaryBackgroundColor} />
        </TouchableOpacity>

    )



}
