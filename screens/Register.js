// Registration screen

import React from "react";
import { StyleSheet, View } from "react-native";
import {
	withTheme,
	TextInput,
	Button,
	IconButton,
	Snackbar,
	Paragraph,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
//import custom components
import BigLogo from "../components/BigLogo";
import FullWidthButton from "../components/FullWidthButton";
import DataManager from "../data/DataManager";

function Register(props) {
	const { colors } = props.theme;
	const { navigate } = props.navigation;

	// For snackbar functionality
	const [visible, setVisible] = React.useState(false);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	// For data input and validation
	const [data, setData] = React.useState({
		name: "",
		password: "",
		isValidData: true,
	});

	// Pass user data using DataManager
	const createUser = (data) => {
		let commonData = DataManager.GetInstance();

		// Check if username already exists
		if (commonData.UserNameExists(data.name)) {
			// If it does, data is invalid
			setData({ isValidData: false });
		} else {
			// Otherwise, make a new user and toggle the snackbar to
			// allow user to directly go to login screen
			commonData.AddUser(data.name, data.password);
			onToggleSnackBar();
		}
	};

	// Check if input is valid
	const validate = (data) => {
		if (!data.name || !data.password) {
			console.log(data.name);
			setData({ isValidData: false });
		} else if (data.name.length < 3 || data.password.length < 3) {
			setData({ isValidData: false });
		} else {
			setData({ isValidData: true });
			createUser(data);
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
			{/* The back button */}
			<IconButton
				icon={() => <MaterialIcons name='close' size={50} color='black' />}
				size={50}
				style={styles.backIcon}
				onPress={() => {
					props.navigation.popToTop();
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
				label='New Username'
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
				label='New Password'
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

			{/* Button that will allow registration */}
			<FullWidthButton
				colors={colors.accent}
				onPress={() => {
					validate(data);
				}}
			>
				REGISTER
			</FullWidthButton>

			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				action={{
					label: "LOGIN NOW",
					onPress: () => {
						navigate("Login");
					},
				}}
			>
				Account registered!
			</Snackbar>
		</View>
	);
}

export default withTheme(Register);
