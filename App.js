import "react-native-gesture-handler";
import * as React from "react";
import { View, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AuthContext } from "./components/Context";
//import navigation stuff
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./routes/WelcomeStackNavigator";
import AccountStackNavigator from "./routes/AccountStackNavigator";
import theme from "./styles/theme";
import { useEffect } from "react";

const RootStack = createStackNavigator();

export default function App() {
	// Enable registration functionality
	const [newName, setNewName] = React.useState(null);
	const [newPass, setNewPass] = React.useState(null);

	// Handling login authentication
	const initialLoginState = {
		isLoading: true,
		userName: null,
		userToken: null,
	};

	// What the program should do in each case
	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case "retrieve_token":
				return {
					...prevState,
					isLoading: false,
				};
			case "login":
				return {
					...prevState,
					username: action.id,
					userToken: action.token,
					isLoading: false,
				};
			case "logout":
				return {
					...prevState,
					username: null,
					userToken: null,
					isLoading: false,
				};
			case "register":
				return {
					...prevState,
					username: action.id,
					userToken: action.token,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = React.useReducer(
		loginReducer,
		initialLoginState
	);

	// Set authentication functions
	const authContext = React.useMemo(
		() => ({
			login: (foundUser) => {
				const userToken = foundUser;

				dispatch({ type: "login", token: userToken });
			},
			logout: () => {
				dispatch({ type: "logout" });
			},
		}),
		[]
	);

	// Loading shouldn't last more than 1000ms
	useEffect(() => {
		setTimeout(() => {
			dispatch({ type: "retrieve_token", token: "retrieved" });
		}, 1000);
	});

	// Loading screen
	if (loginState.isLoading) {
		console.log("loading");
	}
	return (
		<AuthContext.Provider value={authContext}>
			{/* Theme allows color consistency across the app */}
			<PaperProvider theme={theme}>
				<NavigationContainer>
					<RootStack.Navigator screenOptions={{ headerShown: false }}>
						{/* if user token is null, go to the welcome screen. Otherwise, go to my accouts screen. */}
						{loginState.userToken === null ? (
							// Welcome screen navigation
							<RootStack.Screen
								name={"Authstack"}
								component={AuthStackNavigator}
							/>
						) : (
							//Account screen navigation
							<RootStack.Screen
								name={"AccountStack"}
								component={AccountStackNavigator}
							/>
						)}
					</RootStack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</AuthContext.Provider>
	);
}
