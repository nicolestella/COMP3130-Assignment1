// The screen that allows user to edit listings

import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { withTheme, Button, Title } from "react-native-paper";
// import custom components
import CustomCard from "../components/CustomCard";
import DataManager from "../data/DataManager";

function EditListing(props) {
	const { navigate } = props.navigation;
	const [data, setData] = React.useState();

	// Custom card component that displays each travel spot
	const cardItem = ({ item }) => {
		const commonData = DataManager.GetInstance();

		return (
			<CustomCard
				travelSpot={item}
				listingItem
				onPress={() => {
					// When user clicks on the card, display an alert to allow
					// user to confirm listing deletion.
					Alert.alert("Delete listing?", "", [
						{
							text: "Cancel",
						},
						{
							text: "Yes",
							onPress: () => {
								commonData.RemoveTravelSpot(item.id);
								navigate("My Account");
							},
						},
					]);
				}}
			/>
		);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		card: {
			marginTop: 20,
			width: "100%",
		},
		title: {
			textAlign: "center",
			padding: 20,
			width: "100%",
		},
	});

	React.useEffect(() => {
		setData(props.route.params);
	}, []);

	return (
		<View style={styles.container}>
			<Title style={styles.title}>Click on a listing to delete it</Title>
			{/* The list of items */}
			<FlatList
				data={data}
				renderItem={cardItem}
				keyExtractor={(travelSpot) => travelSpot.id}
			/>
		</View>
	);
}

export default withTheme(EditListing);
