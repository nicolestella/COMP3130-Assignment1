import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from '../App';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ffb703',
        accent: '#ededed'
    },
};