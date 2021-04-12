// The navigation stack containing Browse and Details

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
// import screens
import Browse from "../screens/Browse";
import TravelDetails from "../screens/TravelDetails";
//import header components
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import styling
import theme from "../styles/theme";

const BrowseStack = createStackNavigator();

export default function BrowseStackNavigator() {
	return (
		<BrowseStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.primary,
				},
			}}
		>
			{/* Browse screen */}
			<BrowseStack.Screen
				options={{
					headerTitle: () => <Header title='Browse' />,
					headerLeft: null,
				}}
				name={"Browse"}
				component={Browse}
			/>

			{/* The travel details screen */}
			<BrowseStack.Screen name={"Details"} component={TravelDetails} />
		</BrowseStack.Navigator>
	);
}
