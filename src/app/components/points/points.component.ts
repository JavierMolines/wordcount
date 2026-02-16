import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
	storageGetPlayersTreeConfig,
	storageGetPlayerViewPoint,
	storageSetTreeConfig,
} from "@helper/storage/session.storage";

@Component({
	selector: "app-points",
	imports: [RouterModule],
	templateUrl: "./points.component.html",
})
export class PointsComponent implements OnInit {
	playerName: WritableSignal<string> = signal("");
	playerWords: WritableSignal<Array<WordSettings>> = signal([]);
	playerTotalPoints: WritableSignal<number> = signal(0);

	ngOnInit() {
		const playerName = storageGetPlayerViewPoint();
		this.playerName.set(playerName);
		const playerWords = storageGetPlayersTreeConfig();
		this.playerWords.set(playerWords[playerName].words);
		this.calculateTotalPoints();
	}

	onDeleteItem(index: number) {
		const words = this.playerWords();
		words.splice(index, 1);
		this.playerWords.set(words);
		const playerWords = storageGetPlayersTreeConfig();
		playerWords[this.playerName()].words = words;
		storageSetTreeConfig(playerWords);
	}

	private calculateTotalPoints() {
		const words = this.playerWords();
		let total = 0;
		for (const wordRecord of words) {
			total += wordRecord.point;
		}
		this.playerTotalPoints.set(total);
	}
}
