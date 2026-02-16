import { Component, computed, OnInit, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { URL_QUERY_PARAM_DATE } from "@helper/constants.helper";
import { dateParseToTimeLocal } from "@helper/dates.helper";
import { localStorageGetSaveGameRecords } from "@helper/storage/local.storage";
import { storageGetPlayers } from "@helper/storage/session.storage";

@Component({
	selector: "app-menu",
	imports: [RouterModule],
	templateUrl: "./menu.component.html",
})
export class MenuComponent implements OnInit {
	playerInStorage = signal(false);
	gamesHistory = signal<Array<SaveGameRecord>>([]);
	gamesHistoryVisible = computed(() =>
		this.gamesHistory().map((element) => {
			return {
				range: element.date,
				queryParams: { [URL_QUERY_PARAM_DATE]: element.date },
				msg: `${dateParseToTimeLocal(element.date)} - P: ${element.winnerPoints} - G: ${element.winner}`,
			};
		}),
	);

	ngOnInit() {
		const players = storageGetPlayers();
		this.playerInStorage.set(players.length > 0);

		const storedGames: SaveGameRecord[] = localStorageGetSaveGameRecords();
		this.gamesHistory.set(storedGames);
	}
}
