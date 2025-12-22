/** biome-ignore-all lint/suspicious/noExplicitAny: it necesary */

import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { storageGetPlayersTreeConfig } from "../../helper/storage.helper";

@Component({
	selector: "app-end-game",
	imports: [RouterModule],
	templateUrl: "./end-game.component.html",
	styleUrl: "./end-game.component.css",
})
export class EndGameComponent implements OnInit {
	players: WritableSignal<any> = signal({});

	ngOnInit(): void {
		const configPlayers = storageGetPlayersTreeConfig();
		const configConvert: any = Object.entries(configPlayers);

		for (const element of configConvert) {
			const playersWords = element[1].words;
			const totalPointsWords = playersWords.reduce((acc: number, word: any) => {
				return acc + word.point;
			}, 0);
			element[1].totalPointsWords = totalPointsWords;
			element[1].total = totalPointsWords - element[1].negativePoints;
		}

		const sortByTotal = configConvert.sort((a: any, b: any) => {
			return b[1].total - a[1].total;
		});

		this.players.set(sortByTotal);

		//storageSetClearAll();
	}
}
