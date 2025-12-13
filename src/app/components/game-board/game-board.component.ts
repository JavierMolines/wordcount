import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { loadPlayers, setPlayerViewPoint } from "../../helper/storage.helper";

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
		const players = loadPlayers();
		this.players.set(players);
	}

	pressPlayer(player: string) {
		setPlayerViewPoint(player);
		this.router.navigate(["/points"]);
	}
}
