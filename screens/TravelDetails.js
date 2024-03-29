// This is the screen that will display details of a travel spot
import React from "react";
import { StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { withTheme, Title, Paragraph, Chip, Button } from "react-native-paper";

function TravelDetails(props) {
	const travelSpot = props.route.params.data;

	// Source of the image
	const imgSrc = () => {

		if (travelSpot.collection) {
			return "https://source.unsplash.com/collection/" + travelSpot.collection;
		}

		else {
			return travelSpot.img;
		}
	};

	// Tags chips
	const renderItem = ({ item }) => (
		<Chip key={item.id + item.tag} style={styles.chip}>
			{item}
		</Chip>
	);

	return (
		<ScrollView style={styles.container} contentContainerStyle='space-between'>
			<Image source={{uri: imgSrc()}} style={styles.image} />
			<Title style={styles.title}>{travelSpot.title}</Title>
			<Paragraph style={styles.description}>{travelSpot.description}</Paragraph>
			<FlatList
				style={{ flexDirection: "column" }}
				horizontal
				data={travelSpot.tags}
				renderItem={renderItem}
				keyExtractor={(item) => item}
			/>
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
		width: 200,
		justifyContent: "center",
		alignSelf: "center",
		margin: 20,
	},
});

export default withTheme(TravelDetails);
