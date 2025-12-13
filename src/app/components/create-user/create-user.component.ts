import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  mininumPlayersValids = 2;
  validToStartGame = signal(false);
  formPlayers: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formPlayers = this.fb.group({
      player1: [''],
      player2: [''],
      player3: [''],
      player4: ['']
    });
  }

  validateInputsContent() {
    const inputs: Array<string> = Object.values(this.formPlayers.value);
    const inputsWithText = inputs.filter(text => text && text.trim() !== '' && text.length > 2);
    this.validToStartGame.set(inputsWithText.length >= this.mininumPlayersValids);
  }
}
