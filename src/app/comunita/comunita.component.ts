import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button' 
import {MatIconModule} from '@angular/material/icon' 

import { MensaComponent } from '../servizi/mensa/mensa.component';
import { AuletteComponent } from '../servizi/aulette/aulette.component';
import { LavatriceComponent } from '../servizi/lavatrice/lavatrice.component';

import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';


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
  router = inject(Router)
  chosen_service : undefined | "mensa" | "aulette" | "lavatrice" = undefined


  descriptions = {
    "mensa" : "Prendo Libero",
    "aulette" : "Prenota un auletta",
    "lavatrice" : "Prenota la lavatrice",
  }

  choseService(service : string){
    this.router.navigate([`/comunita/${service}`], {skipLocationChange : true});
  }

}
