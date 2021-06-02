// The screen that allows users to add listings

import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { withTheme, Paragraph, Button, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
// import custom components
import TravelSpots from "../data/TravelSpots";
import CustomCard from "../components/CustomCard";
import DataManager from "../data/DataManager";

function AddListing(props) {
	const commonData = DataManager.GetInstance();
	// Will show/hide the search bar
	const [showSearch, setShowSearch] = React.useState(true);
	const onToggleShowSearch = () => setShowSearch(!showSearch);

	// States for the pickers
	const [selectedCategory, setSelectedCategory] = React.useState();
	const [selectedCountry, setSelectedCountry] = React.useState();

	// Data will store the whole TravelSpots array
	const [data, setData] = React.useState([]);
	// Search Data will store the array of items from Data that match the search term
	const [searchData, setsearchData] = React.useState([]);

	// The function that will return the list of items after search
	const handleSearch = () => {
		// For each item in the TravelSpots array, run the contains function on that item.
		const filteredData = searchData.filter((item) => {
			return contains(item, selectedCategory, selectedCountry);
		});

		// Set the data displayed to the filtered data
		setData(filteredData);
	};

	// The function that will check if the search query matches with a travelspot's
	// title, or category
	const contains = ({ tags, country }, categoryQuery, countryQuery) => {
		if (categoryQuery === "None") {
			categoryQuery = null;
		}
		if (countryQuery === "None") {
			countryQuery = null;
		}
		// Search through each item's tags array
		let foundTag = false;
		tags.filter((tag) => {
			if (tag === categoryQuery) {
				// If the tag matches with the query, set this variable to true
				foundTag = true;
			}
		});

		if (
			(country === countryQuery && foundTag) ||
			(!countryQuery && foundTag) ||
			(country === countryQuery && !categoryQuery)
		) {
			return true;
		}
		return false;
	};

	const categories = [
		"None",
		"Art",
		"Drinks",
		"Family",
		"Food",
		"Fun",
		"Hotel",
		"Landmark",
		"Nature",
		"Sightseeing",
		"Theme Park",
		"Urban",
	];

	const countries = ["None", "Australia", "Singapore", "USA", "Worldwide"];

	const categoryPicker = () => {
		let category = [];
		let i = 0;
		categories.forEach((item) => {
			category[i] = <Picker.Item key={item} label={item} value={item} />;
			i++;
		});
		return category;
	};

	const countryPicker = () => {
		let country = [];
		let i = 0;
		countries.forEach((item) => {
			country[i] = <Picker.Item key={item} label={item} value={item} />;
			i++;
		});
		return country;
	};

	// Custom card component that displays each travel spot
	const cardItem = ({ item }) => {
		let commonData = DataManager.GetInstance();
		let savedTravels = commonData.GetSavedTravels();
		let alreadySaved = false;
		for (var i = 0; i < savedTravels.length; i++) {
			if (item.id === savedTravels[i]) {
				alreadySaved = true;
			}
		}
		return (
			<CustomCard
				travelSpot={item}
				listingItem
				isSaved={alreadySaved}
				onPress={() => {
					if (!alreadySaved) {
						Alert.alert("Save listing?", "", [
							{
								text: "Cancel",
							},
							{
								text: "Yes",
								onPress: () => {
									commonData.AddTravelSpot(item.id);
									props.navigation.navigate("My Account");
								},
							},
						]);
					} else {
						Alert.alert(
							"You've already saved this listing!",
							"Try another one.",
							[
								{
									text: "OK",
								},
							],
							{
								cancelable: true,
							}
						);
					}
				}}
			/>
		);
	};

	// Set Data and searchData when the component mounts
	React.useEffect(() => {
		const spots = commonData.GetTravelSpots();
		setData(spots);
		setsearchData(spots);
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
		},
		heading: {
			fontSize: 18,
			marginBottom: 10,
		},
		pickerView: {
			width: "100%",
			height: "12%",
			backgroundColor: "#fff",
			marginBottom: 40,
		},
	});

	return (
		<View style={styles.container}>
			{showSearch ? (
				<View style={{ height: "50%", marginBottom: 20 }}>
					<Paragraph style={styles.heading}>Choose a country</Paragraph>
					<View style={styles.pickerView}>
						<Picker
							style={{ width: "100%", height: "100%" }}
							selectedValue={selectedCountry}
							onValueChange={(val, index) => {
								setSelectedCountry(val);
							}}
						>
							{countryPicker()}
						</Picker>
					</View>
					<Paragraph style={styles.heading}>Choose a category</Paragraph>
					<View style={styles.pickerView}>
						<Picker
							style={{ width: "100%", height: "100%" }}
							selectedValue={selectedCategory}
							onValueChange={(val, index) => {
								setSelectedCategory(val);
							}}
						>
							{categoryPicker()}
						</Picker>
					</View>
					<Button mode='outlined' onPress={handleSearch}>
						Search
					</Button>
					<Button onPress={onToggleShowSearch}>
						<AntDesign name='up' size={24} color='black' />
					</Button>
				</View>
			) : (
				<Button onPress={onToggleShowSearch}>
					<AntDesign name='down' size={24} color='black' />
				</Button>
			)}
			{data.length == 0 ? (
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
						Nothing here... Try choosing different options.
					</Paragraph>
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

export default withTheme(AddListing);
