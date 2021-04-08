import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Welcome from './components/Welcome';

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <Welcome />
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
      ...DefaultTheme.colors,
      primary: '#ffb703',
      accent: '#333333',
      background: '#ededed',
  },
};
