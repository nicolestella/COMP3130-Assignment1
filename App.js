import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
//import react-navigation components
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//import stack navigators
import WelcomeStackNavigator from "./routes/WelcomeStackNavigator";
import LoggedInTabNavigator from "./routes/LoggedInTabNavigator";
import theme from "./styles/theme";

const RootStack = createStackNavigator();

export default function App() {
	return (
		// Theme allows consistency accross the app
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					{/* Welcome screen navigation */}
					<RootStack.Screen
						name={"Welcome"}
						component={WelcomeStackNavigator}
					/>
					{/* Account screen navigation */}
					<RootStack.Screen
						name={"Logged In"}
						component={LoggedInTabNavigator}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
