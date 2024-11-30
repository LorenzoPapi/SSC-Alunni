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
import { Auletta, Prenotazione } from '../../tools/Comunita';
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

  nomi : Map<String, String> = new Map()

  user_auletta : Auletta | null = null

  messaggio : string | null = null

  ora_fine : string | null = null

  constructor(private auth : AuthService, private dataService: DataService){
    this.dataService.getCollection<Auletta>(this.dataService.auletteRef, 'auletta').subscribe((value)=>{
      this.aulette = value.sort((a,b)=>parseInt(a.auletta)-parseInt(b.auletta))
      for (var aula of this.aulette) {
        if (!!aula.prenotazione && aula.prenotazione.studente == auth.userUID()) {
          this.user_auletta = aula
        }
      }
    })

    this.dataService.getCollection<any>(this.dataService.studentiRef, "uid").subscribe((studenti) => {
      for (var s of studenti) {
        this.nomi.set(s.uid, s.nome + " " + s.cognome)
      }
    });
  }

  arrToTime(time : [number, number]){
    return time[0] + ":" + time[1].toString().padStart(2, '0')
  }

  timeToArr(input: string) : [number, number] {
    var s = input.split(":")
    return [parseInt(s[0]), parseInt(s[1])]
  }

  disablitata(auletta : Auletta) {
    return (!!this.user_auletta && this.user_auletta.auletta != auletta.auletta) || (!!auletta.prenotazione && auletta.prenotazione.studente != this.auth.userUID()) 
  }

  selezionaAuletta(auletta : Auletta) {
    if (!auletta.prenotazione) {
      this.user_auletta = auletta
      this.messaggio = "prenota"
    } else {
      this.messaggio = "prenotato"
    }
  }

  prenotaAuletta() {
    var dateNow = new Date()
    this.dataService.updateCollection<{prenotazione:Prenotazione}>(this.user_auletta!.auletta, {
      prenotazione: {
        studente: this.auth.userUID()!,
        ora_inizio: [dateNow.getHours(), dateNow.getMinutes()] as [number, number],
        ora_fine: this.timeToArr(this.ora_fine!)
      }
    }, this.dataService.auletteRef)
    this.messaggio = "prenotato"
  }

  liberaAuletta() {
    this.dataService.updateCollection(this.user_auletta!.auletta, {
      prenotazione: null
    }, this.dataService.auletteRef)
    this.user_auletta!.prenotazione = null
    this.messaggio = "libera"
  }

  reset(full : boolean) {
    this.messaggio = null
    this.ora_fine = null
    if (full) this.user_auletta = null
  }
}