import { Component } from '@angular/core';

import { MatListModule} from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/dataservice.service';
import { Auletta } from '../../tools/Comunita';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aulette',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './aulette.component.html',
  styleUrl: './aulette.component.scss',
  viewProviders: []
})
export class AuletteComponent {
  aulette : Auletta[] = []
  
  stanze_aultette = ['01','02','04','05','17','19','20','21','25' ]

  user_auletta : null | Auletta = null

  sta_prenotando : boolean = false
  
  ora_fine = ""

  constructor(private auth : AuthService, private dataService: DataService){
    this.dataService.getCollection<Auletta>(this.dataService.auletteRef, 'auletta').subscribe((value)=>{
      this.aulette = value.sort((a,b)=>parseInt(a.auletta)-parseInt(b.auletta))
    })   
  }

  arrToTime(time : [number, number]){
    return time[0] + ":" + time[1].toString().padStart(2, '0')
  }

  timeToArr(input: string) : [number, number] {
    var s = input.split(":")
    return [parseInt(s[0]), parseInt(s[1])]
  }

  selezionaAuletta(auletta : string) {
    this.sta_prenotando = true
    this.user_auletta = {
      auletta: auletta,
      prenotazione: null
    }
  }

  prenotaAuletta() {
    this.auth.user$.subscribe((user) => {
      if (!!user) {
        var dateNow = new Date()
        var prenotazione = {
          studente: user.uid,
          inizio: [dateNow.getHours(), dateNow.getMinutes()] as [number, number],
          fine: this.timeToArr(this.ora_fine)
        }
        this.user_auletta!.prenotazione = prenotazione
        
        this.dataService.setCollection<any>(this.user_auletta!.auletta, {prenotazione:prenotazione}, this.dataService.auletteRef)
      }
    })
    this.sta_prenotando = false
  }
}