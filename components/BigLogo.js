// The big logo at the welcome, login, and registration screen

import React from "react";
import { Image } from "react-native";

export default function BigLogo({ style }) {
	return (
		<Image
			source={require("../assets/icons/Logo.png")}
			style={[{ width: 300, height: 300, marginBottom: "10%" }, style]}
		/>
	);
}
