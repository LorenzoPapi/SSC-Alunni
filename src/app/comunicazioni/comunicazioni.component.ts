import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs'; 
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatCheckboxModule} from '@angular/material/checkbox'
import {FormsModule} from '@angular/forms'

import { DataService } from '../services/dataservice.service';
import { Comunicazione, Sondaggio } from '../tools/Comunicazione';

@Component({
  selector: 'app-comunicazioni',
  standalone: true,
  imports: [
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './comunicazioni.component.html',
  styleUrl: './comunicazioni.component.scss',
  viewProviders: [MatExpansionPanel]
})
export class ComunicazioniComponent {
  comunicazioni : Comunicazione[] = []

  opened_panel = -1

  sondaggi : Sondaggio[] = [
    {question: "Quando facciamo l'assemblea", answers : [
      {text : "il 9", selected:false},
      {text : "il 10", selected:false},
      {text : "il 11", selected:false},
      {text : "tanto non ci vengo gne gne", selected:false},
    ]},

    {question: "Quando facciamo l'assemblea", answers : [
      {text : "il 9", selected:false},
      {text : "il 10", selected:false},
      {text : "il 11", selected:false},
      {text : "tanto non ci vengo gne gne", selected:false},
    ]}
  ]

  constructor(private dataService: DataService){
    this.dataService.getCollection<Comunicazione>(this.dataService.comunicazioniRef, "cid").subscribe((values) => {
      this.comunicazioni = values
    })
  }

  expansion_panel_click(i: number){
    this.opened_panel = i == this.opened_panel ? -1 : i
  }
}
