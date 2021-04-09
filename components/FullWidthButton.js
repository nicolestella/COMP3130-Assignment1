// This is the template for the login and register buttons
import React from 'react';
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function FullWidthButton ({style, children, colors, onPress}) {
  return (
    <Button 
      mode="contained" 
      uppercase 
      color={colors} 
      labelStyle={styles.buttonText} 
      style={[styles.button, style]}
      onPress={onPress}
    >
        {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: '10%'
  },
  buttonText: {
    padding: '3%'
  },
});