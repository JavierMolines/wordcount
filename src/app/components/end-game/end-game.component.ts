/** biome-ignore-all lint/style/noNonNullAssertion: it necesary */
import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { URL_QUERY_PARAM_DATE } from "@helper/constants.helper";
import { dateGenerateToString } from "@helper/dates.helper";
import {
	localStorageGetSaveGameRecords,
	localStorageSetSaveGameRecords,
} from "@helper/storage/local.storage";
import {
	storageGetPlayersTreeConfig,
	storageSetClearAll,
} from "@helper/storage/session.storage";

@Component({
	selector: "app-end-game",
	imports: [RouterModule],
	templateUrl: "./end-game.component.html",
})
export class EndGameComponent implements OnInit {
	players: WritableSignal<Array<[string, GameSettings]>> = signal([]);

	private obtainGameInformation(
		game: GameInformation,
	): Array<[string, GameSettings]> {
		const configConvert = Object.entries(game);

		for (const element of configConvert) {
			if (typeof element[1].negativePoints === "undefined") {
				element[1].negativePoints = 0;
			}

			const playersWords = element[1].words;
			const totalPointsWords = playersWords.reduce(
				(acc: number, word: WordSettings) => {
					return acc + word.point;
				},
				0,
			);
			element[1].totalPointsWords = totalPointsWords;
			element[1].total = totalPointsWords - element[1].negativePoints;
		}

		const sortByTotal = configConvert.sort((a, b) => {
			return b[1].total! - a[1].total!;
		});

		return sortByTotal;
	}

	private saveGameInfoStorage(
		parserInformation: Array<[string, GameSettings]>,
		gameInformation: GameInformation,
	): void {
		if (parserInformation.length === 0) {
			return;
		}

		const payload: SaveGameRecord = {
			date: dateGenerateToString(),
			game: gameInformation,
			winner: parserInformation[0][0],
			winnerPoints: parserInformation[0][1].total!,
			players: parserInformation.length,
			isRecords: true,
		};

		localStorageSetSaveGameRecords(payload);
		storageSetClearAll();
	}

	private getUrlParam() {
		const urlParams = new URLSearchParams(window.location.search);
		const data = urlParams.get(URL_QUERY_PARAM_DATE);
		if (typeof data !== "string") return null;
		return data;
	}

	ngOnInit(): void {
		const gameId = this.getUrlParam();

		// Flow - game finish
		if (!gameId) {
			const sessionInformation = storageGetPlayersTreeConfig();
			const gameInformation = this.obtainGameInformation(sessionInformation);
			this.players.set(gameInformation);
			this.saveGameInfoStorage(gameInformation, sessionInformation);
			return;
		}

		// Flow - game in history
		const range = this.getUrlParam();
		const gameSearch = localStorageGetSaveGameRecords().filter(
			(record) => record.date === range,
		);

		if (gameSearch.length === 0) return;

		const gameInformation = this.obtainGameInformation(gameSearch[0].game);
		this.players.set(gameInformation);
	}
}
