import React from "react";
import { Button } from "react-native-paper";
import { AuthContext } from "./Context";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function LogoutButton() {
	const iconSize = 24;

	const { logout } = React.useContext(AuthContext);

	return (
		<Button onPress={() => logout()} size={iconSize} color='#000'>
			<SimpleLineIcons name='logout' size={iconSize} />
		</Button>
	);
}
