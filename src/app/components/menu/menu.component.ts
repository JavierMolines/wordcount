import { Component, OnInit, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { storageGetPlayers } from "../../helper/storage.helper";

@Component({
	selector: "app-menu",
	imports: [RouterModule],
	templateUrl: "./menu.component.html",
	styleUrl: "./menu.component.css",
})
export class MenuComponent implements OnInit {
	playerInStorage = signal(false);

	ngOnInit() {
		const players = storageGetPlayers();
		this.playerInStorage.set(players.length > 0);
	}
}
