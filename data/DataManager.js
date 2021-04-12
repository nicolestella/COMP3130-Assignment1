// The instance that will allow screens to fetch user data

import Users from "../data/Users";

export default class DataManager {
	static myInstance = null;
	users = Users;
	idCounter = 2;
	userID = "";
	savedTravels = [];

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

	GetTravelSpots() {
		return this.savedTravels;
	}

	AddTravelSpot(id) {
		this.savedTravels.push(id);
	}

	RemoveTravelSpot(id) {
		const newArr = this.savedTravels.filter((item) => item !== id);
		this.savedTravels = newArr;
	}
}
