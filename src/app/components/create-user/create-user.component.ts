import { Component, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
	storageClearPlayers,
	storageSetPlayers,
	storageSetPlayersTreeConfig,
} from "../../helper/storage.helper";

@Component({
	selector: "app-create-user",
	imports: [RouterModule, ReactiveFormsModule],
	templateUrl: "./create-user.component.html",
	styleUrl: "./create-user.component.css",
})
export class CreateUserComponent implements OnInit {
	mininumPlayersValids = 2;
	validToStartGame = signal(false);
	formPlayers: FormGroup;

	constructor(private fb: FormBuilder) {
		this.formPlayers = this.fb.group({
			player1: [""],
			player2: [""],
			player3: [""],
			player4: [""],
		});
	}

	ngOnInit() {
		storageClearPlayers();
	}

	validateInputsContent() {
		const inputs: Array<string> = Object.values(this.formPlayers.value);
		const inputsWithText = inputs.filter(
			(text) => text && text.trim() !== "" && text.length > 2,
		);

		const inputsValids = inputsWithText.length >= this.mininumPlayersValids;
		const noRepeatedNames = this.validateNonRepeatedNames(inputsWithText);
		const result = inputsValids && noRepeatedNames;

		this.validToStartGame.set(result);

		if (result) {
			storageSetPlayers(JSON.stringify(inputsWithText));
			storageSetPlayersTreeConfig(inputsWithText);
		}
	}

	private validateNonRepeatedNames(players: Array<string>): boolean {
		const normalized = players.map((t) => t.toLowerCase().trim());
		return new Set(normalized).size === normalized.length;
	}
}
