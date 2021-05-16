// This screen displays all the travel spots
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import { withTheme, Searchbar } from "react-native-paper";
// import custom components
import CustomCard from "../components/CustomCard";
import TravelSpots from "../data/TravelSpots";
import DataManager from '../data/DataManager';

function Travels(props) {
	const { navigate } = props.navigation;
	const commonData = DataManager.GetInstance();

	// Data will store the whole TravelSpots array
	const [data, setData] = React.useState([]);

	// Query is the text entered into the searchbar
	const [query, setQuery] = React.useState("");
	// Search Data will store the array of items from Data that match the search term
	const [searchData, setsearchData] = React.useState([]);

	// Custom card component that displays each travel spot
	const cardItem = ({ item }) => (
		<CustomCard travelSpot={item} onPress={() => navigate("Details", item)} />
	);

	// The function that will return the list of items after search
	const handleSearch = (txt) => {
		// Convert the search query to lowercase
		const formattedQuery = txt.toLowerCase();

		// For each item in the TravelSpots array, run the contains function on that item.
		const filteredData = searchData.filter((item) => {
			return contains(item, formattedQuery);
		});

		// Set the data displayed to the filtered data
		setData(filteredData);
		// Set searchbar text to whatever the user is typing
		setQuery(txt);
	};

	// The function that will check if the search query matches with a travelspot's
	// keyword, title, or tags
	const contains = ({ keyword, title, tags, country }, query) => {
		// Convert title to lowercase because all queries are converted to lowercase
		const lowCaseTitle = title.toLowerCase();
		const lowCaseCountry = country.toLowerCase();

		// Search through each item's tags array
		let foundTag = false;
		tags.filter((tag) => {
			const lowCaseTag = tag.toLowerCase();
			if (lowCaseTag.includes(query)) {
				// If the tag matches with the query, set this variable to true
				foundTag = true;
			}
		});

		// If the search query matches with any object's keyword, title, or tags, return true
		if (
			keyword.includes(query) ||
			lowCaseTitle.includes(query) ||
			lowCaseCountry.includes(query) ||
			foundTag
		) {
			return true;
		}
		return false;
	};

	const isFocused = useIsFocused();
	// Set Data and searchData when the component mounts
	React.useEffect(() => {
		const spots = commonData.GetTravelSpots();
		setData(spots);
		setsearchData(spots);
	}, [isFocused]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.container}>
			{/* The search bar */}
			<Searchbar
				placeholder='Search'
				value={query}
				onChangeText={handleSearch}
			/>

			{/* The list of items */}
			<FlatList
				data={data}
				renderItem={cardItem}
				keyExtractor={(travelSpot) => travelSpot.id}
			/>
		</View>
	);
}

export default withTheme(Travels);
