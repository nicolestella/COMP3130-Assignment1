import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
//import navigation stuff
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./routes/WelcomeStackNavigator";
import AccountStackNavigator from "./routes/AccountStackNavigator";
import theme from "./styles/theme";

const RootStack = createStackNavigator();

export default function App() {
	return (
		// Theme allows consistency accross the app
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					{/* Welcome screen navigation */}
					<RootStack.Screen name={"AuthStack"} component={AuthStackNavigator} />
					{/* Account screen navigation */}
					<RootStack.Screen
						name={"AccountStack"}
						component={AccountStackNavigator}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
