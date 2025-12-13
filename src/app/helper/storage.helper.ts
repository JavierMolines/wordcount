const STORAGE_PLAYERS_KEY = "players";
const STORAGE_SELECTED_PLAYER_KEY = "selectedPlayer";
const STORAGE_PLAYERS_WORDS_KEY = "playersWords";

export const storageClearPlayers = (): void => {
	sessionStorage.removeItem(STORAGE_PLAYERS_KEY);
};

export const storageSetPlayers = (players: string) => {
	sessionStorage.setItem(STORAGE_PLAYERS_KEY, players);
};

export const storageGetPlayers = (): Array<string> => {
	try {
		const storePlayers = sessionStorage.getItem(STORAGE_PLAYERS_KEY) || "";
		return JSON.parse(storePlayers);
	} catch {
		return [];
	}
};

export const storageSetPlayerViewPoint = (player: string) => {
	sessionStorage.setItem(STORAGE_SELECTED_PLAYER_KEY, player);
};

export const storageGetPlayerViewPoint = () => {
	return sessionStorage.getItem(STORAGE_SELECTED_PLAYER_KEY) || "";
};

export const storageGetPlayersTreeConfig = () => {
	try {
		return JSON.parse(
			sessionStorage.getItem(STORAGE_PLAYERS_WORDS_KEY) || "[]",
		);
	} catch {
		return [];
	}
};

export const storageSetPlayersTreeConfig = (players: Array<string>) => {
	// biome-ignore lint/suspicious/noExplicitAny: it necesary
	const structure: any = {};

	for (const player of players) {
		structure[player] = {
			words: [],
		};
	}

	sessionStorage.setItem(STORAGE_PLAYERS_WORDS_KEY, JSON.stringify(structure));
};
