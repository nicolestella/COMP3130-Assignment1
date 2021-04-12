// The stack that shows the welcome, login, and registration screens

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name={"Welcome"} component={Welcome} />
			<AuthStack.Screen name={"Login"} component={Login} />
			<AuthStack.Screen name={"Register"} component={Register} />
		</AuthStack.Navigator>
	);
}
