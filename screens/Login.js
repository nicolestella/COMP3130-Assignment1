// Login screen

import React from "react";
import { StyleSheet, View } from "react-native";
import {
	withTheme,
	TextInput,
	Button,
	IconButton,
	Paragraph,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
//import custom components
import BigLogo from "../components/BigLogo";
import FullWidthButton from "../components/FullWidthButton";
import Users from "../data/Users";
import { AuthContext } from "../components/Context";

function Login(props) {
	const { colors } = props.theme;
	const { navigate } = props.navigation;
	const newUser = props.route.params;

	// Data entry
	const [data, setData] = React.useState({
		name: "",
		password: "",
		isValidData: true,
	});

	// Login handling
	const { login } = React.useContext(AuthContext);

	const loginHandle = (username, password) => {
		// Loop through the array of registered users and check if the inputted
		// data matches any existing records.
		let foundUser;
		for (var i = 0; i < Users.length; i++) {
			if (username == Users[i].name && password == Users[i].password) {
				foundUser = true;
			}
		}

		// Check if the input name matches existing records or it matches the
		// newly registered record
		if (!foundUser && !newUser) {
			// If not, display error message.
			setData({ isValidData: false });
		}
		// Otherwise, check if there is any newly registered record
		else if (!foundUser && newUser) {
			//If so, check if the input matches that newly registered record
			const foundNewUser =
				username == newUser.name && password == newUser.password;
			// If it does, log the user in
			if (foundNewUser) {
				login(foundNewUser);
			}
		} else {
			login(foundUser);
		}
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.primary,
			alignItems: "center",
			justifyContent: "center",
		},
		textInput: {
			width: "90%",
			backgroundColor: "#fff",
			margin: 12,
		},
		backIcon: {
			position: "absolute",
			top: 20,
			right: 0,
		},
		error: {
			color: "#ff0000",
			fontWeight: "bold",
		},
	});

	return (
		<View style={styles.container}>
			{/* The close button */}
			<IconButton
				icon={() => <MaterialIcons name='close' size={50} color='black' />}
				size={50}
				style={styles.backIcon}
				onPress={() => {
					navigate("Welcome");
				}}
			/>

			{/* Brand logo */}
			<BigLogo />

			{/* if username or password is invalid, display error message  */}
			{data.isValidData ? null : (
				<Paragraph style={styles.error}>Invalid username or password</Paragraph>
			)}

			{/* Username input */}
			<TextInput
				label='Username'
				style={styles.textInput}
				value={data.name}
				onChangeText={(val) => {
					setData({
						...data,
						name: val,
					});
				}}
			/>

			{/* Password input */}
			<TextInput
				label='Password'
				style={styles.textInput}
				secureTextEntry={true}
				value={data.password}
				onChangeText={(val) => {
					setData({
						...data,
						password: val,
					});
				}}
			/>

			<Button
				color={colors.accent}
				onPress={() => {
					navigate("Register");
				}}
			>
				Don't have an account? Sign up!
			</Button>

			{/* Button that will allow login */}
			<FullWidthButton
				colors={colors.accent}
				onPress={() => {
					loginHandle(data.name, data.password);
				}}
			>
				LOGIN
			</FullWidthButton>
		</View>
	);
}

export default withTheme(Login);
