import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

export interface PrenotazioneLavatrice{
  studente : string;
  ora_inizio : [number , number]
  ora_fine: [number , number]
} 

@Component({
  selector: 'app-lavatrice',
  standalone: true,
  imports: [MatLabel, CommonModule, MatTabsModule],
  templateUrl: './lavatrice.component.html',
  styleUrl: './lavatrice.component.scss'
})
export class LavatriceComponent {
  times = Array.from({ length: 48 }, (_, x) => (Math.floor(x/2)+ ":" +( x%2 == 0 ? '00' : '30')));

  cell_height = 50

  prenotazioni : PrenotazioneLavatrice[] = [
    {
      studente : "Simone",
      ora_inizio : [0 , 0],
      ora_fine: [1 , 0]
    },
    {
      studente : "Simone",
      ora_inizio : [1 , 45],
      ora_fine: [3 , 0]
    },
    {
      studente : "Lorenzo",
      ora_inizio : [6 , 45],
      ora_fine: [8 , 0]
    }
  ]

  ngOnInit(){
    console.log(this.times)
  }

  prenotazioneStyle(prenotazione : PrenotazioneLavatrice){
    const hour2px = (hour : [number, number]) =>{
      return Math.floor((hour[0]*2 + hour[1]/30)*this.cell_height)
    }

    var style = {
      'top': hour2px(prenotazione.ora_inizio) + "px",
      'height': (hour2px(prenotazione.ora_fine) - hour2px(prenotazione.ora_inizio))+ "px",
    }

    return style
  }

  prenota(event: MouseEvent){
    var y_offset = (event.target as HTMLElement).parentElement!.getBoundingClientRect().top
    var y_scroll = (event.target as HTMLElement).parentElement!.scrollTop
    var screen_y = event.y + y_scroll - y_offset
    var half_cell = screen_y/this.cell_height

    var hour = Math.floor(half_cell/2)
    var minutes = Math.floor((half_cell%2)*30)

    this.prenotazioni.push({
      studente: "Gay",
      ora_inizio : [hour, minutes],
      ora_fine : [hour+1, minutes]
    })
  }
  
}
