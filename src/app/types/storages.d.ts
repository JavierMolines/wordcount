/** biome-ignore-all lint/suspicious/noExplicitAny: it necesary */
declare interface SaveGameRecord {
	date: string;
	winner: string;

	winnerPoints: number;
	players: number;

	game: Array<any>;

	isRecords: boolean;
}
