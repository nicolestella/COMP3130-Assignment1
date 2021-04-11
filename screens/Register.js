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

function Register(props) {
	const { colors } = props.theme;
	const { navigate } = props.navigation;

	// For snackbar functionality
	const [visible, setVisible] = React.useState(false);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	const [data, setData] = React.useState({
		name: "",
		password: "",
		isValidData: true,
	});

	const registerHandle = (username, password) => {
		const validData =
			username != null &&
			username.length != 0 &&
			password != null &&
			password.length != 0;

		if (validData == false) {
			setData({ isValidData: false });
		} else {
			onToggleSnackBar();
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
				<Paragraph style={styles.error}>
					Username and password cannot be empty
				</Paragraph>
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
					registerHandle(data.name, data.password);
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
						navigate("Login", data);
					},
				}}
			>
				Account registered!
			</Snackbar>
		</View>
	);
}

export default withTheme(Register);
