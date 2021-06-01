// The screen that displays user account

import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import { withTheme, Button, Paragraph, FAB, Portal, Provider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
// import custom components
import TravelSpots from "../data/TravelSpots";
import CustomCard from "../components/CustomCard";
import DataManager from "../data/DataManager";
import theme from '../styles/theme'

// Function to get the array of travel IDs for given user
const commonData = DataManager.GetInstance();
const getTravelIDs = () => {
	return commonData.GetSavedTravels();
};

function MyAccount(props) {
	const { navigate } = props.navigation;
	const [data, setData] = React.useState();
	const [isEmpty, setIsEmpty] = React.useState(false);

	const [open, setOpen] = React.useState(false);
	// Custom card component that displays each travel spot
	const cardItem = ({ item }) => (
		<CustomCard
			travelSpot={item}
			onPress={
				() => navigate("Browse",
					{
						screen: "Details",
						initial: false,
						params: {
							data: item
						}
					})}
		/>
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
		let travels = [];
		let spots = commonData.GetTravelSpots();
		// Get the TravelSpots objects that have a corresponding id
		for (var i = 0; i < savedTravels.length; i++) {
			travels[i] = spots.find((item) => item.id === savedTravels[i]);
		}
		setData(travels);
	}, [isFocused]);

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
		fab: {
			// position: 'absolute',
			// margin: 16,
			// right: 0,
			// bottom: 0,
			backgroundColor: theme.colors.primary
		},
		portal: {
			marginBottom: 50,
		}
	});

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row" }}>
				<Portal>
					<FAB.Group
						open={open}
						icon="cog-outline"
						fabStyle={styles.fab}
						style={styles.portal}
						actions={[
							{
								icon: 'plus',
								label: 'Add Listing',
								onPress: () => navigate("Add Listing")
							},
							{
								icon: 'minus',
								label: 'Remove listing',
								onPress: () => navigate("Edit Listing", data)
							},
							{
								icon: 'pencil-plus-outline',
								label: 'Make custom listing',
								onPress: () => navigate("Custom Listing")
							},
							{
								icon: 'eye-outline',
								label: 'View custom listings',
								onPress: () => navigate("View Custom Listings")
							}
						]}
					onStateChange={() => setOpen(!open)}
					onPress={() => setOpen(!open)}
					/>
				</Portal>
			</View>

			{/* If there are no listings saved, display text to prompt user to add listings */}
			{isEmpty ? (
				<View style={{ alignItems: "center", paddingTop: 100 }}>
					<AntDesign name='frowno' size={50} color='grey' />
					<Paragraph
						style={{
							fontSize: 20,
							paddingTop: 30,
							textAlign: "center",
							color: "#737373",
						}}
					>
						Nothing here... Try adding listings.
					</Paragraph>
				</View>
			) : null}
			{/* The list of items */}
			<FlatList
				data={data}
				renderItem={cardItem}
				keyExtractor={(travelSpot) => travelSpot.id}
			/>
		</View>
	);
}

export default withTheme(MyAccount);
