// The navigation stack containing accounts, add listing, and edit listing

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
// import screens
import MyAccount from "../screens/MyAccount";
import SaveListing from "../screens/SaveListing";
import UnsaveListing from "../screens/UnsaveListing";
import EditCustomListing from "../screens/EditCustomListing";
import MyCustomListings from '../screens/MyCustomListings';
//import header components
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";
import NewListingButton from '../components/NewListingButton';
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
			<AccountStack.Screen name='Save Listing' component={SaveListing} />

			{/* Delete listings screen */}
			<AccountStack.Screen name='Unsave Listing' component={UnsaveListing} />

			{/* Create listings screen */}
			<AccountStack.Screen
				options={({ navigation }) => ({
					headerTitle: () => <Header title='View Custom Listings' />,
					headerRight: () => <NewListingButton navigation={navigation} />
				})}
				name='View Custom Listings'
				component={MyCustomListings}
			/>

			{/* Create listings screen */}
			<AccountStack.Screen name='Custom Listing' component={EditCustomListing} />
		</AccountStack.Navigator>
	);
}
