// Implement a tab navigator to allow user to navigate between
// My Account and Browse

import * as React from "react";
//import react-navigation components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import stack navigators
import AccountStackNavigator from "./AccountStackNavigator";
import BrowseStackNavigator from "./BrowseStackNavigator";
// import icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import theme from "../styles/theme";

const Tab = createBottomTabNavigator();

export default function LoggedInTabNavigator() {
	return (
		// Theme allows consistency accross the app
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: () => {
					let iconName;

					if (route.name === "Account") {
						iconName = "account-circle-outline";
					} else if (route.name === "Browse") {
						iconName = "map-search";
					}
					return (
						<MaterialCommunityIcons
							name={iconName}
							size={40}
							color={theme.colors.accent}
						/>
					);
				},
			})}
			tabBarOptions={{
				activeBackgroundColor: theme.colors.primary,
			}}
		>
			{/* Welcome screen navigation */}
			<Tab.Screen name={"Account"} component={AccountStackNavigator} />
			{/* Account screen navigation */}
			<Tab.Screen name={"Browse"} component={BrowseStackNavigator} />
		</Tab.Navigator>
	);
}
