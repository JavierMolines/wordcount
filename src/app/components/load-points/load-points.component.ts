import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
	ɵInternalFormsSharedModule,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { storageGetPlayers } from "../../helper/storage.helper";

@Component({
	selector: "app-load-points",
	imports: [
		RouterModule,
		CommonModule,
		ɵInternalFormsSharedModule,
		ReactiveFormsModule,
	],
	templateUrl: "./load-points.component.html",
	styleUrl: "./load-points.component.css",
})
export class LoadPointsComponent implements OnInit {
	players: WritableSignal<Array<string>> = signal([]);
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			item1: ["", Validators.required],
			item2: ["", Validators.required],
			select: ["", Validators.required],
		});
	}

	ngOnInit(): void {
		const players = storageGetPlayers();
		this.players.set(players);
	}

	onClickButton(): void {
		if (!this.form.valid) {
			return;
		}

		console.log("Button clicked");
	}
}
