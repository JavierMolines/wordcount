import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import {
	storageGetPlayers,
	storageSetPlayersTreeConfig,
	storageSetPlayerViewPoint,
} from "../../helper/storage.helper";

@Component({
	selector: "app-game-board",
	imports: [RouterModule],
	templateUrl: "./game-board.component.html",
	styleUrl: "./game-board.component.css",
})
export class GameBoardComponent implements OnInit {
	players: WritableSignal<Array<string>> = signal([]);

	constructor(private router: Router) {}

	ngOnInit() {
		const players = storageGetPlayers();
		this.players.set(players);
		storageSetPlayersTreeConfig(players);
	}

	pressPlayer(player: string) {
		storageSetPlayerViewPoint(player);
		this.router.navigate(["/points"]);
	}
}
