// The screen that displays user account

import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme, Card } from "react-native-paper";

function MyAccount(props) {
	const { colors } = props.theme;
	const { navigate } = props.navigation;

	props.navigation.navigationOptions;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return <View style={styles.container}></View>;
}

export default withTheme(MyAccount);
