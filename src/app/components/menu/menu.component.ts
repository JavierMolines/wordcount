import { Component, computed, OnInit, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
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
	gamesHistoryVisible = computed(() => {
		return this.gamesHistory().map((element) => {
			return `${dateParseToTimeLocal(element.date)} - P: ${element.winnerPoints} - G: ${element.winner}`;
		});
	});

	ngOnInit() {
		const players = storageGetPlayers();
		this.playerInStorage.set(players.length > 0);

		const storedGames: SaveGameRecord[] = localStorageGetSaveGameRecords();
		this.gamesHistory.set(storedGames);
	}
}
