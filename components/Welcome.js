// This is the welcome screen.

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { withTheme, Button } from "react-native-paper";

function Welcome(props) {
  const { colors } = props.theme;

  // This is the template for the login and register buttons
  const buttonItem = (text) => (
    <Button mode="contained" uppercase color={colors.accent} labelStyle={styles.buttonText} style={styles.button}>
        {text}
    </Button>
  );

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
      <Image source={require('../assets/icons/Logo.png')} style={{width: 300, height: 300, marginBottom: '10%'}}/>
      
      {/* The title */}
      <Text style={styles.title}>TripBee</Text>

      {/* Buttons */}
      {buttonItem('LOGIN')}
      {buttonItem('REGISTER')}
    </View>
  );
}

export default withTheme(Welcome)
