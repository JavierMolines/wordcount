import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./components/menu/menu.component").then((m) => m.MenuComponent),
	},
	{
		path: "users",
		loadComponent: () =>
			import("./components/create-user/create-user.component").then(
				(m) => m.CreateUserComponent,
			),
	},
	{
		path: "game",
		loadComponent: () =>
			import("./components/game-board/game-board.component").then(
				(m) => m.GameBoardComponent,
			),
	},
	{
		path: "points",
		loadComponent: () =>
			import("./components/points/points.component").then(
				(m) => m.PointsComponent,
			),
	},
	{
		path: "load-points",
		loadComponent: () =>
			import("./components/load-points/load-points.component").then(
				(m) => m.LoadPointsComponent,
			),
	},
	{
		path: "review",
		loadComponent: () =>
			import("./components/review-points/review-points.component").then(
				(m) => m.ReviewPointsComponent,
			),
	},
	{
		path: "end-game",
		loadComponent: () =>
			import("./components/end-game/end-game.component").then(
				(m) => m.EndGameComponent,
			),
	},
];
