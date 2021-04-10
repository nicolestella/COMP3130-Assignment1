import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
// import screens
import MyAccount from "../screens/MyAccount";
import Travels from "../screens/Travels";
import TravelDetails from "../screens/TravelDetails";
//import header components
import Header from "../components/Header";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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
					headerBackImage: () => (
						<SimpleLineIcons name='logout' size={24} color='black' />
					),
					// The add button
					headerRight: () => (
						<Button onPress={() => navigation.navigate("Travels")}>
							<AntDesign name='plus' size={24} color='black' />
						</Button>
					),
				})}
				name={"My Account"}
				component={MyAccount}
			/>
			{/* Travels screen */}
			<AccountStack.Screen
				options={{
					headerTitle: () => <Header title='Travels' />,
					headerBackImage: () => (
						<MaterialCommunityIcons
							name='account-circle-outline'
							size={35}
							color='black'
						/>
					),
					headerRight: () => (
						<Button>
							<MaterialIcons name='search' size={32} color='black' />
						</Button>
					),
				}}
				name={"Travels"}
				component={Travels}
			/>
			{/* The travel details screen */}
			<AccountStack.Screen name={"Details"} component={TravelDetails} />
		</AccountStack.Navigator>
	);
}
