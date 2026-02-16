import { Component, effect, OnInit, signal } from "@angular/core";
import {
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
	storageGetPlayers,
	storageSetRecordsNegativePointsForPlayer,
} from "@helper/storage/session.storage";

@Component({
	selector: "app-review-points",
	imports: [ReactiveFormsModule, RouterModule],
	templateUrl: "./review-points.component.html",
})
export class ReviewPointsComponent implements OnInit {
	form: FormGroup;
	players = signal<Array<string>>([]);

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			inputs: this.fb.array([]),
		});

		effect(() => {
			const players = this.players();
			this.syncFormArray(players);
		});
	}

	ngOnInit(): void {
		const playersData = storageGetPlayers();
		this.players.set(playersData);
		this.form.statusChanges.subscribe((status) => {
			if (status !== "VALID") {
				return;
			}

			const values = this.form.value.inputs;
			this.onFormValid(values);
		});
	}

	get inputs(): FormArray {
		return this.form.get("inputs") as FormArray;
	}

	private syncFormArray(players: Array<string>) {
		this.inputs.clear();

		players.forEach((player) => {
			this.inputs.push(
				this.fb.group({
					id: [player],
					value: [
						"",
						[Validators.required, Validators.min(0), Validators.max(1000)],
					],
				}),
			);
		});
	}

	private onFormValid(values: Array<ReviewPointInput>) {
		for (const element of values) {
			storageSetRecordsNegativePointsForPlayer(element.id, element.value);
		}
	}
}
