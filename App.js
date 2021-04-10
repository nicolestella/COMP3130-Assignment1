import "react-native-gesture-handler";
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
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					{/* Welcome screen navigation */}
					<RootStack.Screen name={"Authstack"} component={AuthStackNavigator} />

					{/* Accounts screens navigation */}
					<RootStack.Screen
						name={"AccountStack"}
						component={AccountStackNavigator}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
