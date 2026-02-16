declare interface WordSettings {
	word: string;
	point: number;
}

declare interface GameSettings {
	words: WordSettings[];

	total?: number;
	totalPointsWords?: number;
	negativePoints?: number;
}

declare type GameInformation = Record<string, GameSettings>;

declare interface SaveGameRecord {
	date: string;
	winner: string;

	winnerPoints: number;
	players: number;

	game: GameInformation;

	isRecords: boolean;
}
