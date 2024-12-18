import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button' 
import {MatIconModule} from '@angular/material/icon' 

import { ClpComponent } from '../servizi/clp/clp.component';
import { AuletteComponent } from '../servizi/aulette/aulette.component';
import { LavatriceComponent } from '../servizi/lavatrice/lavatrice.component';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MensaComponent } from "../servizi/mensa/mensa.component";


@Component({
  selector: 'app-comunita',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ClpComponent,
    AuletteComponent,
    LavatriceComponent,
    CommonModule,
    MensaComponent
],
  templateUrl: './comunita.component.html',
  styleUrl: './comunita.component.scss'
})
export class ComunitaComponent {
  router = inject(Router)
  chosen_service : undefined | "clp" | "aulette" | "lavatrice" | "mensa" = undefined


  descriptions = {
    "mensa": "Prenota mensa",
    "clp" : "Prendo Libero",
    "aulette" : "Prenota un'auletta",
    "lavatrice" : "Prenota la lavatrice",
  }
}
