import React from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { withTheme, Title, Paragraph, Card, Button } from "react-native-paper";
import CustomCard from "../components/CustomCard";
import TravelSpots from "../data/TravelSpots";

function Travels(props) {
	const { colors } = props.theme;
	const { navigate } = props.navigation;

	const cardItem = ({ item }) => (
		<CustomCard travelSpot={item} onPress={() => navigate("Details", item)} />
	);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.container}>
			<FlatList
				data={TravelSpots}
				renderItem={cardItem}
				keyExtractor={(travelSpot) => travelSpot.id}
			/>
		</View>
	);
}

export default withTheme(Travels);
