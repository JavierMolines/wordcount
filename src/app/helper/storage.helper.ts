const STORAGE_PLAYERS_KEY = "players";
const STORAGE_SELECTED_PLAYER_KEY = "selectedPlayer";

export const loadPlayers = (): Array<string> => {
	try {
		const storePlayers = sessionStorage.getItem(STORAGE_PLAYERS_KEY) || "";
		return JSON.parse(storePlayers);
	} catch {
		return [];
	}
};

export const setPlayerViewPoint = (player: string) => {
	sessionStorage.setItem(STORAGE_SELECTED_PLAYER_KEY, player);
};

export const clearPlayers = (): void => {
	sessionStorage.removeItem(STORAGE_PLAYERS_KEY);
};
