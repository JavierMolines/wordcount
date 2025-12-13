import { Routes } from "@angular/router";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { EndGameComponent } from "./components/end-game/end-game.component";
import { GameBoardComponent } from "./components/game-board/game-board.component";
import { LoadPointsComponent } from "./components/load-points/load-points.component";
import { MenuComponent } from "./components/menu/menu.component";
import { PointsComponent } from "./components/points/points.component";

export const routes: Routes = [
	{
		path: "",
		component: MenuComponent,
	},
	{
		path: "users",
		component: CreateUserComponent,
	},
	{
		path: "game",
		component: GameBoardComponent,
	},
	{
		path: "points",
		component: PointsComponent,
	},
	{
		path: "load-points",
		component: LoadPointsComponent,
	},
	{
		path: "end-game",
		component: EndGameComponent,
	},
];
