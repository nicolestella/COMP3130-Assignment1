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
import DataManager from "../data/DataManager";

function Login(props) {
	const { colors } = props.theme;
	const { navigate } = props.navigation;
	const newUser = props.route.params;

	// Function to check if inputted credentials matches any stored credentials
	const validateUser = () => {
		return (
			Users.filter(
				(user) => user.name === data.name && user.password === data.password
			).length > 0
		);
	};

	// Function to get User object based on the name
	const getUser = ({ name }) => {
		return Users.find((user) => user.name === name);
	};

	// Pass user data using DataManager
	const createUser = ({ name }) => {
		let commonData = DataManager.GetInstance();
		let userID = getUser({ name }).id;
		commonData.SetUserID(userID);
	};

	// Data entry
	const [data, setData] = React.useState({
		name: "",
		password: "",
		isValidData: true,
	});

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
					if (validateUser()) {
						createUser(data);
						navigate("AccountStack");
					} else {
						setData({ isValidData: false });
					}
				}}
			>
				LOGIN
			</FullWidthButton>
		</View>
	);
}

export default withTheme(Login);
