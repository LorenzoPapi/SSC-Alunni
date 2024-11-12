import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mensa',
  standalone: true,
  imports: [
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    MatLabel,
    MatButtonModule
  ],
  templateUrl: './mensa.component.html',
  styleUrl: './mensa.component.scss'
})
export class MensaComponent {
  time : "pranzo" | "cena" = "pranzo" 
  cercano : {[key : string] : string[]} = {
    "pranzo" : ["Tizio", "Caio", "Pippo","Palle","Tizio", "Caio", "Pippo","Palle", "Palle","Tizio", "Caio", "Pippo","Palle"],
    "cena" : ["Mucca", "Gatto"]
  }

  liberano : {[key : string] : number}= {
    "pranzo" : 3,
    "cena" : 5
  }

}
