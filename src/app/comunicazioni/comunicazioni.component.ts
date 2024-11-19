import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs'; 
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatCheckboxModule} from '@angular/material/checkbox'
import {FormsModule} from '@angular/forms'

import { DataService, StreamConnection } from '../services/dataservice.service';
import { Comunicazione } from '../tools/Comunicazione';

export interface Sondaggio{
  question: string;
  aswers: {text: string, selected:boolean}[];
}

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


  constructor(private dataService: DataService){

  }
  
  opened_panel = -1
  
  sondaggi : Sondaggio[] = [
    {question: "Quando facciamo l'assemblea", aswers : [
      {text : "il 9", selected:false},
      {text : "il 10", selected:false},
      {text : "il 11", selected:false},
      {text : "tanto non ci vengo gne gne", selected:false},
    ]},

    {question: "Quando facciamo l'assemblea", aswers : [
      {text : "il 9", selected:false},
      {text : "il 10", selected:false},
      {text : "il 11", selected:false},
      {text : "tanto non ci vengo gne gne", selected:false},
    ]}
  ]

  comunicazioni : Comunicazione[] = []

  ngInit(){

  }

  expansion_panel_click(i: number){
    this.opened_panel = i==this.opened_panel ? -1 : i
  }

}
