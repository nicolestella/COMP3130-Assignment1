// The logout button in My Accounts screen

import React from "react";
import { Button } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function LogoutButton({ navigation }) {
	return (
		<Button
			onPress={() => navigation.navigate("Welcome", { screen: "Welcome" })}
			size={24}
			color='#000'
		>
			<SimpleLineIcons name='logout' size={24} />
		</Button>
	);
}
