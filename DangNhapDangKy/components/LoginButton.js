import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowHeight } from '../utils/Dimensions';

export default function LoginButton({buttonTitle, ...rest}) {
    return (

        <TouchableOpacity style={styles.buttonContainer} {...rest}>

            <Text style={styles.buttonText}>{buttonTitle}</Text>

        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 30,
      width: '100%',
      height: windowHeight / 15,
      backgroundColor: '#FFCC33',
      padding: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: 3,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
  });