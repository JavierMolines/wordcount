import { Component, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-game-board",
	imports: [RouterModule],
	templateUrl: "./game-board.component.html",
	styleUrl: "./game-board.component.css",
})
export class GameBoardComponent {
	players: WritableSignal<Array<string>> = signal([]);

	ngOnInit() {
		const players = this.loadPlayers();
		console.log("Loaded players:", players);
		this.players.set(players);
	}

	private loadPlayers(): Array<string> {
		try {
			const storePlayers = sessionStorage.getItem("players") || "";
			return JSON.parse(storePlayers);
		} catch {
			return [];
		}
	}
}
