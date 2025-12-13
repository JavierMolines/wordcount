import { Routes } from "@angular/router";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { GameBoardComponent } from "./components/game-board/game-board.component";
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
];
