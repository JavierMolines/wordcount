import { Component, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { loadPlayers } from "../../helper/storage.helper";

@Component({
	selector: "app-game-board",
	imports: [RouterModule],
	templateUrl: "./game-board.component.html",
	styleUrl: "./game-board.component.css",
})
export class GameBoardComponent {
	players: WritableSignal<Array<string>> = signal([]);

	ngOnInit() {
		const players = loadPlayers();
		console.log("Loaded players:", players);
		this.players.set(players);
	}
}
