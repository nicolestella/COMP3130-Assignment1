// The screen that displays user account

import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import {
	withTheme,
	Paragraph,
	Button
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
// import custom components
import CustomCard from "../components/CustomCard";
import DataManager from "../data/DataManager";

// Function to get the array of travel IDs for given user
const getTravelIDs = () => {
	let commonData = DataManager.GetInstance();
	return commonData.GetCustomListings();
};

function EditCustomListing(props) {
	const { navigate } = props.navigation;
	const [data, setData] = React.useState();
  const [isEmpty, setIsEmpty] = React.useState(false);

	// Custom card component that displays each travel spot
	const cardItem = ({ item }) => (
		<CustomCard travelSpot={item} onEdit={() => navigate('Custom Listing', item)} />
	);

	// Check if the screen is in focus/is currently open
	const isFocused = useIsFocused();

	React.useEffect(() => {
		// Update the displayed data everytime the screen comes into focus.
		const savedTravels = getTravelIDs();
		if (savedTravels.length == 0) {
			setIsEmpty(true);
		} else {
			setIsEmpty(false);
		}
		setData(savedTravels);
	}, [isFocused]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
      justifyContent: "center",
      padding: 10,
		},
		card: {
			marginTop: 20,
			width: "100%",
		},
		button: {
			margin: 20,
		},
		buttonContents: {
			height: 70,
		}
	});

	return (
		<View style={styles.container}>
			{/* If there are no listings saved, display text to prompt user to add listings */}
			{isEmpty ? (
				<View style={{ alignItems: "center", paddingTop: 100 }}>
					<Button
						mode="outlined"
						icon="plus"
						style={styles.button}
						contentStyle={styles.buttonContents}
						color="grey"
						onPress={() => navigate("Custom Listing")}
					>
						Nothing yet.. Add a new listing?
					</Button>
				</View>
			) : (
				<FlatList
					data={data}
					renderItem={cardItem}
					keyExtractor={(travelSpot) => travelSpot.id}
				/>
			)}
		</View>
	);
}

export default withTheme(EditCustomListing);
