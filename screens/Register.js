// Registration screen

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
//import custom components
import BigLogo from '../components/BigLogo'
import FullWidthButton from '../components/FullWidthButton';

function Register(props) {
  const { colors } = props.theme;
  const { navigate } = props.navigation;
  const [name, setName]= React.useState('');
  const [password, setPassword]= React.useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      width: '90%',
      backgroundColor: '#fff',
      margin: 12
    },
    backIcon: {
      position: 'absolute',
      top: 40,
      left: 0,
    }  
  })

  return (
    <View style={styles.container}>

      {/* The back button */}
      <Button
        icon={() => (
          <MaterialIcons name="close" size={50} color="black" />
        )}
        style={styles.backIcon}
        onPress={() => {
          navigate('Welcome');
        }}
      />

      {/* Brand logo */}
      <BigLogo />

      {/* Username input */}
      <TextInput 
        label="New Username"
        style={styles.textInput}
        value={name}
        onChangeText={name => setName(name)}
      />

      {/* Password input */}
      <TextInput 
        label="New Password"
        style={styles.textInput}
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      
      {/* Button that will allow registration */}
      <FullWidthButton colors={colors.accent}>
        REGISTER
      </FullWidthButton>
    </View>
  );
}

export default withTheme(Register)