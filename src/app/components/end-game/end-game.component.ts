/** biome-ignore-all lint/style/noNonNullAssertion: it necesary */
import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { dateGenerateToString } from "@helper/dates.helper";
import { localStorageSetSaveGameRecords } from "@helper/storage/local.storage";
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

	ngOnInit(): void {
		const configPlayers = storageGetPlayersTreeConfig();
		const configConvert = Object.entries(configPlayers);

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

		this.players.set(sortByTotal);

		storageSetClearAll();

		// Save game records to local storage
		if (configConvert.length === 0) {
			return;
		}

		const payload: SaveGameRecord = {
			date: dateGenerateToString(),
			game: configPlayers,
			winner: sortByTotal[0][0],
			winnerPoints: sortByTotal[0][1].total!,
			players: sortByTotal.length,
			isRecords: true,
		};

		localStorageSetSaveGameRecords(payload);
	}
}
