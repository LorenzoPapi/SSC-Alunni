import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs'; 
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatCheckboxModule} from '@angular/material/checkbox'
import {FormsModule} from '@angular/forms'

export interface Comunicazione{
  title: string;
  description: string;
}

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [MatExpansionPanel]
})
export class ComunicazioniComponent {
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

  comunicazioni : Comunicazione[] = [
    {title: "Date i vostri soldi a simone", description : "E si e giunto il mmneto di dare i soldi a me simone cutrona "},
    {title: "questa 'e per te montano", description : "perche non fai mai un cazzo coglione"},
    {title: "Sai cosa mi piace", description : "i piedi"}
  ]

  ngInit(){

  }

  expansion_panel_click(i: number){
    this.opened_panel = i==this.opened_panel ? -1 : i
  }

}
