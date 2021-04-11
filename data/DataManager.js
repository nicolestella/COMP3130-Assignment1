import Users from "../data/Users";

export default class DataManager {
	static myInstance = null;
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

	SetUserID(id) {
		this.userID = id;
		const user = Users.filter((user) => user.id === id);
		this.savedTravels = user[0].savedTravels;
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
