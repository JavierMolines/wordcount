const STORAGE_PLAYERS_SAVE_RECORDS = "gamesHistory";

export const localStorageGetSaveGameRecords = () => {
	try {
		const storeRecords =
			localStorage.getItem(STORAGE_PLAYERS_SAVE_RECORDS) || "[]";
		return JSON.parse(storeRecords);
	} catch (error) {
		console.log("Error getting game records from local storage");
		console.log(error);
		return [];
	}
};

export const localStorageSetSaveGameRecords = (records: SaveGameRecord) => {
	try {
		const storeRecords =
			localStorage.getItem(STORAGE_PLAYERS_SAVE_RECORDS) || "[]";
		const parsedRecords = JSON.parse(storeRecords);
		parsedRecords.push(records);
		localStorage.setItem(
			STORAGE_PLAYERS_SAVE_RECORDS,
			JSON.stringify(parsedRecords),
		);
	} catch (error) {
		console.log("Error saving game records to local storage");
		console.log(error);
	}
};
