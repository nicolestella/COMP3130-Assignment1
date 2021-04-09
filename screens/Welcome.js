// The welcome screen.

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-paper";
//import custom components
import FullWidthButton from '../components/FullWidthButton';
import BigLogo from '../components/BigLogo';

function Welcome(props) {
  const { navigate } = props.navigation;
  const { colors } = props.theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold'
    },
    button: {
      width: '100%',
      marginTop: '10%'
    },
    buttonText: {
      padding: '3%'
    },
  });

  return (
    <View style={styles.container}>

      {/* The logo */}
      <BigLogo />
      
      {/* The title */}
      <Text style={styles.title}>TripBee</Text>

      {/* Buttons */}
      <FullWidthButton colors={colors.accent} 
        onPress={() => {
          navigate('Login');
        }}
      >
        LOGIN
      </FullWidthButton>
      <FullWidthButton colors={colors.accent}
        onPress={() => {
          navigate('Register');
        }}
      >
        REGISTER
      </FullWidthButton>
    </View>
  );
}

export default withTheme(Welcome)
