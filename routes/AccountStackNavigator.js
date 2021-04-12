// The navigation stack containing accounts, travel list, and travel details
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
// import screens
import MyAccount from "../screens/MyAccount";
import Browse from "../screens/Browse";
import TravelDetails from "../screens/TravelDetails";
import AddListing from "../screens/AddListing";
import EditListing from "../screens/EditListing";
//import header components
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
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
					headerLeft: () => (
						<Button
							onPress={() => navigation.navigate("AuthStack")}
							size={24}
							color='#000'
						>
							<SimpleLineIcons name='logout' size={24} />
						</Button>
					),
					// The add button
					headerRight: () => (
						<Button onPress={() => navigation.navigate("Browse")}>
							<AntDesign name='search1' size={24} color='black' />
						</Button>
					),
				})}
				name={"My Account"}
				component={MyAccount}
			/>

			{/* Add listings screen */}
			<AccountStack.Screen name='Add Listing' component={AddListing} />

			{/* Add listings screen */}
			<AccountStack.Screen name='Edit Listing' component={EditListing} />

			{/* Browse screen */}
			<AccountStack.Screen
				options={{
					headerTitle: () => <Header title='Browse' />,
					headerBackImage: () => (
						<MaterialCommunityIcons
							name='account-circle-outline'
							size={35}
							color='black'
						/>
					),
					headerRight: () => <Button />,
				}}
				name={"Browse"}
				component={Browse}
			/>

			{/* The travel details screen */}
			<AccountStack.Screen name={"Details"} component={TravelDetails} />
		</AccountStack.Navigator>
	);
}
