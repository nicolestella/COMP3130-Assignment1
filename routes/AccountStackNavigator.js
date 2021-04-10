import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import screens
import MyAccount from "../screens/MyAccount";
import Travels from "../screens/Travels";
//import header components
import Header from "../components/Header";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//import styling
import theme from "../styles/theme";

const AccountStack = createStackNavigator();

export default function AccountStackNavigator() {
	return (
		<AccountStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.primary,
				},
			}}
		>
			{/* My Account screen */}
			<AccountStack.Screen
				options={{
					headerTitle: () => <Header title='My Account' />,
					headerBackImage: () => (
						<SimpleLineIcons name='logout' size={24} color='black' />
					),
					// TODO: header right
				}}
				name={"My Account"}
				component={MyAccount}
			/>
			{/* Travels screen */}
			<AccountStack.Screen
				options={{
					headerTitle: () => <Header title='Travels' />,
				}}
				name={"Travels"}
				component={Travels}
			/>
		</AccountStack.Navigator>
	);
}
