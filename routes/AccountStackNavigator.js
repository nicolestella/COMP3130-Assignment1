// The navigation stack containing accounts, add listing, and edit listing

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
// import screens
import MyAccount from "../screens/MyAccount";
import AddListing from "../screens/AddListing";
import EditListing from "../screens/EditListing";
//import header components
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";
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
				options={({ navigation }) => ({
					headerTitle: () => <Header title='My Account' />,
					// The logout button
					headerLeft: () => <LogoutButton navigation={navigation} />,
					// To add padding
					headerRight: () => <Button></Button>,
				})}
				name={"My Account"}
				component={MyAccount}
			/>

			{/* Add listings screen */}
			<AccountStack.Screen name='Add Listing' component={AddListing} />

			{/* Delete listings screen */}
			<AccountStack.Screen name='Edit Listing' component={EditListing} />
		</AccountStack.Navigator>
	);
}
