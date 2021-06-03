import React from "react";
import { StackActions } from "@react-navigation/native";
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
	Platform
} from "react-native";
import {
	TextInput,
	Button,
	Paragraph,
	Chip,
	HelperText,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';


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
	const [sameTitle, setSameTitle] = React.useState(false);
	let errorMsg = [];

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
		if (errorMsg.length === 0 && !sameTitle) {
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
						const popAction = StackActions.pop(1);
						props.navigation.dispatch(popAction);
					},
				},
			]);
		} else if (sameTitle) {
			return Alert.alert("This listing already exists!", "Try using a different name", [
				{
					text: "OK",
				},
			]);
		} else {
			return Alert.alert(displayError(errorMsg), "", [
				{
					text: "OK",
				},
			]);
		}
	};

	const handleDelete = () => {
		return Alert.alert("Delete listing?", "This action cannot be reversed", [
				{
					text: "Cancel",
				},
				{
					text: "Yes",
          onPress: () => {
            commonData.DeleteListing(data.id)
						navigate("View Custom Listings");
					},
				},
			]);
	}

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
		buttonDiv: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			width: '100%',
		},
		delete: {
			margin: 5,
			width: '50%',
		}
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

	const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
			setData({
				...data,
				img: result.uri
			});
    }
  };

	React.useEffect(() => {
		 (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
		})();
		
		if (props.route.params) {
			if (props.route.params.title) {
				setData(props.route.params);
				setIsEditing(true);
			}
    }
	}, [])
	
	React.useEffect(() => {
		setSameTitle(commonData.TitleExists(data.title));

		if (!data.img) {
			errorMsg.push("Image");
		}
		if (data.title.length < 1) {
			errorMsg.push("Title");
		}
		if (data.country.length < 1) {
			errorMsg.push("Country");
		}
		if (data.description.length < 1) {
			errorMsg.push("Description");
		}
		if (data.tags.length < 1) {
			errorMsg.push("Tags");
    }
	}, [data])

	return (
		<ScrollView style={styles.container}>
			{data.img && <Image source={{uri: data.img}} style={styles.image} />}
			<Button
				mode="outlined"
				icon="camera-outline"
				onPress={pickImage}
				style={styles.button}
				color="grey"
			>
				Choose your image
			</Button>
			<TextInput
				label='Title*'
				mode='outlined'
				value={data.title}
				onChangeText={(text) =>
					setData({
						...data,
						title: text,
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
					prompt="Choose the country"
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
					prompt="Choose your tags"
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
			
			{isEditing
				? (
					<View style={styles.buttonDiv}>
						<Button mode="outlined" style={styles.delete} color="red" onPress={handleDelete}> DELETE </Button>

						<Button mode='contained' style={styles.delete} onPress={handleSubmit}>
							SUBMIT
						</Button>
					</View>
				)
				: (
					<Button mode='contained' style={styles.button} onPress={handleSubmit}>
						SUBMIT
					</Button>
				)
			}
		</ScrollView>
	);
}

export default CustomListing;
