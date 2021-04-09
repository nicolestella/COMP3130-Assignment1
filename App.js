import "react-native-gesture-handler";
import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
//import navigation stuff
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './routes/WelcomeStackNavigator';

const RootStack = createStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={theme}>

			<NavigationContainer>

        {/* Welcome screen navigation */}
				<RootStack.Navigator screenOptions={{headerShown: false}}>
					<RootStack.Screen name={'Authstack'} component={AuthStackNavigator} />
				</RootStack.Navigator>
			</NavigationContainer>

		</PaperProvider>
	);
}

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: "#ffb703",
		accent: "#333333",
		background: "#ededed",
	},
};
