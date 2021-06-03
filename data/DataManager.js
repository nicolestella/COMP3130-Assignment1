// The instance that will allow screens to fetch user data

import Users from "../data/Users";
import TravelSpots from '../data/TravelSpots';

export default class DataManager {
	static myInstance = null;
	users = Users;
	idCounter = 2;
	userID = "";
	savedTravels = [];
	customID = 11;
	travelSpots = TravelSpots;

	static GetInstance() {
		if (DataManager.myInstance == null) {
			DataManager.myInstance = new DataManager();
		}
		return this.myInstance;
	}

	GetUserID() {
		return this.userID;
	}

	UserNameExists(name) {
		const foundName = this.users.find((user) => user.name === name);
		if (foundName) {
			return true;
		}
		return false;
	}

	SetUserID(id) {
		this.userID = id;
		const user = this.users.filter((user) => user.id === id);
		this.savedTravels = user[0].savedTravels;
	}

	AddUser(newName, newPass) {
		this.idCounter++;
		const newUser = {
			id: "user" + this.idCounter.toString(),
			name: newName,
			password: newPass,
			savedTravels: [],
		};
		this.users.push(newUser);
	}

	GetSavedTravels() {
		return this.savedTravels;
	}

	AddTravelSpot(id) {
		this.savedTravels.push(id);
	}

	RemoveTravelSpot(id) {
		const newArr = this.savedTravels.filter((item) => item !== id);
		this.savedTravels = newArr;
	}

	AddCustomListing(data) {
		this.customID += 1;
		data.id = (this.customID).toString();
		this.travelSpots.push(data);
	}

	GetCustomListings() {
		const newArr = this.travelSpots.filter((item) => item.custom === true);
		return newArr;
	}

	EditListing(data) {
		let result = [];
		let customListings = this.GetCustomListings();
		for (var i = 0; i < customListings.length; i++){
			if (customListings[i].id === data.id) {
				result[i] = data;
			} else {
				result[i] = customListings[i];
			}
		}
		customListings = result;

		let temp = [];
		for (var i = 0; i < this.travelSpots.length; i++){
			if (this.travelSpots[i].id === data.id) {
				temp[i] = data;
			} else {
				temp[i] = this.travelSpots[i];
			}
		}
		this.travelSpots = temp;
	}

	DeleteListing(id) {
		const newArr = this.travelSpots.filter((item) => item.id !== id);
		this.travelSpots = newArr;
	}

	GetTravelSpots() {
		return this.travelSpots;
	}

	TitleExists(title) {
		let temp = []
		temp = this.travelSpots.filter((item) => item.title === title);
		if (temp.length > 0) {
			return true;
		}
		else {
			return false;
		}
	}
}
