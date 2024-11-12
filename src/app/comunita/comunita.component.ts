import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button' 
import {MatIconModule} from '@angular/material/icon' 

import { MensaComponent } from '../servizi/mensa/mensa.component';
import { AuletteComponent } from '../servizi/aulette/aulette.component';
import { LavatriceComponent } from '../servizi/lavatrice/lavatrice.component';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-comunita',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MensaComponent,
    AuletteComponent,
    LavatriceComponent,
    CommonModule
  ],
  templateUrl: './comunita.component.html',
  styleUrl: './comunita.component.scss'
})
export class ComunitaComponent {
  chosen_service : null | "mensa" | "aulette" | "lavatrice" = null 

  descriptions = {
    "mensa" : "Prendo Libero",
    "aulette" : "Prenota un auletta",
    "lavatrice" : "Prenota la lavatrice",
  }

}
