import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { withTheme, Paragraph, Button, IconButton } from "react-native-paper";
import TravelSpots from "../data/TravelSpots";
import CustomCard from "../components/CustomCard";
import DataManager from "../data/DataManager";
import { AntDesign } from "@expo/vector-icons";

// Function to get the array of travel IDs for given user
const getTravelIDs = () => {
	let commonData = DataManager.GetInstance();
	let id = commonData.GetUserID();
	return commonData.GetTravelSpots(id);
};

function AddListing(props) {
	const savedTravels = getTravelIDs();

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
		// Search through each item's tags array
		let foundTag = false;
		tags.filter((tag) => {
			if (tag === categoryQuery) {
				// If the tag matches with the query, set this variable to true
				foundTag = true;
			}
		});

		// If the search query matches with any object's country or category, return true
		if (
			(country === countryQuery && foundTag) ||
			(countryQuery === "None" && foundTag) ||
			(country === countryQuery && categoryQuery === "None")
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
	const cardItem = ({ item }) => <CustomCard travelSpot={item} />;

	// Set Data and searchData when the component mounts
	React.useEffect(() => {
		setData(TravelSpots);
		setsearchData(TravelSpots);
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
				<View style={{ height: "40%", marginBottom: 20 }}>
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