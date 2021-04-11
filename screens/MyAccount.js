// The screen that displays user account

import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { withTheme, Button } from "react-native-paper";
// import custom components
import TravelSpots from "../data/TravelSpots";
import CustomCard from "../components/CustomCard";
import DataManager from "../data/DataManager";

// Function to get the array of travel IDs for given user
const getTravelIDs = () => {
	let commonData = DataManager.GetInstance();
	let id = commonData.GetUserID();
	return commonData.GetTravelSpots(id);
};

function MyAccount(props) {
	const { navigate } = props.navigation;

	// Save the array of travel IDs in this variable
	const savedTravelIDs = getTravelIDs();

	// Get the TravelSpots objects that have a corresponding id
	let travels = [];
	for (var i = 0; i < savedTravelIDs.length; i++) {
		travels[i] = TravelSpots.find((item) => item.id === savedTravelIDs[i]);
	}

	// Custom card component that displays each travel spot
	const cardItem = ({ item }) => (
		<CustomCard travelSpot={item} onPress={() => navigate("Details", item)} />
	);

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
		button: {
			margin: 20,
		},
	});

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row" }}>
				<Button
					mode='outlined'
					style={styles.button}
					onPress={() => navigate("Add Listing")}
				>
					Add new listing
				</Button>
				<Button mode='outlined' style={styles.button}>
					Edit listings
				</Button>
			</View>

			{/* The list of items */}
			<FlatList
				data={travels}
				renderItem={cardItem}
				keyExtractor={(travelSpot) => travelSpot.id}
			/>
		</View>
	);
}

export default withTheme(MyAccount);
