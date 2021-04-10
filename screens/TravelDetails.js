// This is the screen that will display details of a travel spot
import React from "react";
import { StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { withTheme, Title, Paragraph, Chip, Button } from "react-native-paper";

function TravelDetails({ route }) {
	const travelSpot = route.params;

	const imgSrc = {
		uri: "https://source.unsplash.com/collection/" + travelSpot.collection,
	};

	const renderItem = ({ item }) => (
		<Chip key={item} style={styles.chip}>
			{item}
		</Chip>
	);

	return (
		<ScrollView style={styles.container} contentContainerStyle='space-between'>
			<Image source={imgSrc} style={styles.image} />
			<Title style={styles.title}>{travelSpot.title}</Title>
			<Paragraph style={styles.description}>{travelSpot.description}</Paragraph>
			<FlatList
				style={{ flexDirection: "column" }}
				horizontal
				data={travelSpot.tags}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<Button mode='contained' style={styles.button}>
				Save
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		height: 250,
		width: "100%",
	},
	title: {
		fontSize: 25,
		padding: 10,
	},
	description: {
		fontSize: 15,
		padding: 10,
		paddingTop: 0,
	},
	chip: {
		alignItems: "center",
		justifyContent: "center",
		margin: 5,
	},
	button: {
		height: 60,
		width: 200,
		justifyContent: "center",
		alignSelf: "center",
		margin: 20,
	},
});

export default withTheme(TravelDetails);
