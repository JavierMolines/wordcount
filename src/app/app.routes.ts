import { Routes } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

export const routes: Routes = [
    {
        path: "", component: GameBoardComponent
    },
    {
        path: "users", component: CreateUserComponent
    }
];
