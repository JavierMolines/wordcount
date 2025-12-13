import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { storageGetPlayerViewPoint } from "../../helper/storage.helper";

@Component({
	selector: "app-points",
	imports: [RouterModule],
	templateUrl: "./points.component.html",
	styleUrl: "./points.component.css",
})
export class PointsComponent implements OnInit {
	playerName: WritableSignal<string> = signal("");

	ngOnInit() {
		const playerName = storageGetPlayerViewPoint();
		this.playerName.set(playerName);
	}
}
