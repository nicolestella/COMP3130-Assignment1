import React from "react";
import { useIsFocused } from "@react-navigation/native";
import theme from "../styles/theme";
import DataManager from "../data/DataManager";
// import react native components
import {
	StyleSheet,
	View,
	FlatList,
	Alert,
	Image,
	ScrollView,
} from "react-native";
import {
	TextInput,
	Button,
	Paragraph,
	Chip,
	HelperText,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

function CustomListing(props) {
	const { navigate } = props.navigation;
	const commonData = DataManager.GetInstance();
	const [data, setData] = React.useState({
		id: "",
		title: "",
		country: "",
		img: null,
		tags: [],
		description: "",
		custom: true,
  });
  const [isEditing, setIsEditing] = React.useState(false);

	const [selectedCategory, setSelectedCategory] = React.useState();

	const tags = [
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

	const categoryPicker = () => {
		let category = [];
		let i = 0;
		tags.forEach((item) => {
			category[i] = <Picker.Item key={item} label={item} value={item} />;
			i++;
		});
		return category;
	};

	const countries = ["Australia", "Singapore", "USA", "Worldwide"];

	const countryPicker = () => {
		let country = [];
		let i = 0;
		countries.forEach((item) => {
			country[i] = <Picker.Item key={item} label={item} value={item} />;
			i++;
		});
		return country;
	};

	const formatText = (str) => {
		str = str.replace(/^\s+|\s+$/g, ""); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		const to = "aaaaeeeeiiiioooouuuunc------";
		for (let i = 0, l = from.length; i < l; i++) {
			str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
		}

		str = str
			.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
			.replace(/\s+/g, "-") // collapse whitespace and replace by -
			.replace(/-+/g, "-"); // collapse dashes

		str = str.replace("-", "").replace(" ", "");
		return str;
	};

	// Tags chips
	const renderItem = ({ item }) => (
		<Chip
			key={item.id + item.tag}
			style={styles.chip}
			onClose={() => removeCategory(item)}
		>
			{item}
		</Chip>
  );
  
	const displayError = (arr) => {
		let str = "Please fill in these fields: \n";
		arr.map((item) => {
			str += item;
			if (arr.length > 1) {
				str += ", ";
			}
		});
		if (arr.length > 1) {
			return str.substring(0, str.length - 3);
		} else {
			return str;
		}
	};

	const handleSubmit = () => {
    let temp = [];
		if (data.title.length < 1) {
			temp.push("Title");
		}
		if (!data.country) {
			temp.push("Country");
		}
		if (data.description.length < 1) {
			temp.push("Description");
		}
		if (data.tags.length < 1) {
			temp.push("Tags");
    }

		if (
			data.country &&
			data.description.length > 0 &&
			data.img &&
			data.title.length > 0 &&
			data.tags
    ) {
      
			return Alert.alert("Submit listing?", "", [
				{
					text: "Cancel",
				},
				{
					text: "Yes",
          onPress: () => {
            if (!isEditing) {
              commonData.AddCustomListing(data);
            }
            else {
              commonData.EditListing(data);
            }
						navigate("View Custom Listings");
					},
				},
			]);
		} else {
			return Alert.alert(displayError(temp), "", [
				{
					text: "OK",
				},
			]);
		}
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			margin: 20,
		},
		image: {
			height: 250,
			width: "100%",
		},
		description: {
			height: 200,
		},
		pickerView: {
			width: "100%",
			height: 50,
			backgroundColor: "#fff",
			marginBottom: 10,
		},
		chip: {
			alignItems: "center",
			justifyContent: "center",
			margin: 5,
			backgroundColor: theme.colors.primary,
		},
		button: {
			margin: 5,
		},
	});

	const chooseCategory = (val) => {
		let found = false;
		for (var i = 0; i < data.tags.length; i++) {
			if (data.tags[i] === val) {
				found = true;
			}
		}
		if (found === false) {
			data.tags.push(val);
		}
	};

	const removeCategory = (val) => {
		let arr = data.tags.filter((item) => item !== val);
		setData({
			...data,
			tags: arr,
		});
  };
  

  React.useEffect(() => {
    if (props.route.params) {
      setData(props.route.params);
      setIsEditing(true);
    }
  },[])

	return (
		<ScrollView style={styles.container}>
			{data.img ? <Image source={data.img} style={styles.image} /> : null}
			<TextInput
				label='Title*'
				mode='outlined'
				value={data.title}
				onChangeText={(text) =>
					setData({
						...data,
						title: text,
						img: {
							uri: `https://source.unsplash.com/weekly?${formatText(text)}`,
						},
					})
				}
			/>
			<HelperText type='error' visible={data.title.length <= 0}>
				{" "}
				Please fill this field{" "}
			</HelperText>
			<Paragraph style={styles.heading}>Choose a country*</Paragraph>
			<View style={styles.pickerView}>
				<Picker
					style={{ width: "100%", height: "100%" }}
					selectedValue={data.country}
					onValueChange={(val, index) => {
						setData({
							...data,
							country: val,
						});
					}}
				>
					{countryPicker()}
				</Picker>
			</View>
			<TextInput
				style={styles.description}
				label='Description*'
				mode='outlined'
				value={data.description}
				onChangeText={(text) =>
					setData({
						...data,
						description: text,
					})
				}
			/>
			<HelperText type='error' visible={data.description.length <= 0}>
				{" "}
				Please fill this field{" "}
			</HelperText>
			<Paragraph style={styles.heading}>Choose up to 3 tags*</Paragraph>
			<View style={styles.pickerView}>
				<Picker
					style={{ width: "100%" }}
					selectedValue={selectedCategory}
					onValueChange={(val, index) => {
						setSelectedCategory(val);
						chooseCategory(val);
					}}
				>
					{categoryPicker()}
				</Picker>
			</View>
			<FlatList
				style={{ flexDirection: "column" }}
				horizontal
				data={data.tags}
				renderItem={renderItem}
				keyExtractor={(item) => item}
			/>

			<Button mode='contained' style={styles.button} onPress={handleSubmit}>
				SUBMIT
			</Button>
		</ScrollView>
	);
}

export default CustomListing;
