import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-points",
	imports: [RouterModule],
	templateUrl: "./points.component.html",
	styleUrl: "./points.component.css",
})
export class PointsComponent implements OnInit {
	ngOnInit() {}
}
