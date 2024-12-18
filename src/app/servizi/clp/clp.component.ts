import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clp',
  standalone: true,
  imports: [
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    MatLabel,
    MatButtonModule
  ],
  templateUrl: './clp.component.html',
  styleUrl: './clp.component.scss'
})
export class ClpComponent {
  is_prendi_showing = false

  time : "pranzo" | "cena" = "pranzo" 
  cercano : {[key : string] : string[]} = {
    "pranzo" : ["Tizio", "Caio", "Pippo","Palle","Tizio", "Caio", "Pippo","Palle", "Palle","Tizio", "Caio", "Pippo","Palle"],
    "cena" : ["Mucca", "Gatto"]
  }

  liberano : {[key : string] : number}= {
    "pranzo" : 3,
    "cena" : 5
  }

  showPrendi(){
    this.is_prendi_showing = true
  }

}
