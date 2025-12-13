export const loadPlayers = (): Array<string> => {
	try {
		const storePlayers = sessionStorage.getItem("players") || "";
		return JSON.parse(storePlayers);
	} catch {
		return [];
	}
};
