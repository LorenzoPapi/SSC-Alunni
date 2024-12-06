import { Component, computed, inject, OnDestroy, Signal } from '@angular/core';

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
export class AuletteComponent implements OnDestroy {
  stanze = ['01', '02', '04', '05', '17', '19', '20', '21', '25']
 
  user_auletta : Auletta | null = null

  messaggio : string | null = null

  ora_fine : string | null = null

  dataService = inject(DataService)
  stream = this.dataService.connectToStream<any>(this.dataService.auletteRef)
  aulette_sig : Signal<Auletta[]> = computed(() => {
    return Object.entries(this.stream.signal()!).map((e : [string, any]) => {
      return {
        numero: e[0],
        prenotazione: e[1]
      }
    }).sort((a, b) => parseInt(a.numero) - parseInt(b.numero))
  })
  
  constructor(private auth : AuthService){
    //TODO: non sono sicuro sia questo il miglior modo
    setTimeout(() => {
      this.aulette_sig().forEach((a) => {
        if (!!a.prenotazione && a.prenotazione.studente == this.auth.userUID()) {
          this.user_auletta = a
        }
      })
      console.log("aulette", this.aulette_sig())
    }, 400)
  }

  ngOnDestroy(): void {
    this.stream.unsubscribe()
  }

  arrToTime(time : [number, number]){
    return time[0] + ":" + time[1].toString().padStart(2, '0')
  }

  timeToArr(input: string) : [number, number] {
    var s = input.split(":")
    return [parseInt(s[0]), parseInt(s[1])]
  }

  disabilitata(auletta : Auletta) : boolean {
    return (!!this.user_auletta && this.user_auletta.numero != auletta.numero) || (!!auletta.prenotazione && auletta.prenotazione.studente != this.auth.userUID()) 
  }

  timeFromDate(s: {seconds: number}) {
    //console.log(s)
    var data = new Date(s.seconds*1000)
    return data.getHours() + ":" + data.getMinutes().toString().padStart(2, '0')
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
    this.stream.set(this.user_auletta!.numero, {
      ora_inizio: [0, 0],
      studente: this.auth.userUID()!,
      ora_fine: this.timeToArr(this.ora_fine!)
    })

    // const offset = ref(this.dataService.db, ".info/serverTimeOffset")
    // onValue(offset, (snap) => {
    //   const offset = snap.val()
    //   const estim = new Date().getTime() + offset
    //   console.log(estim, offset)
    // })
    this.messaggio = "prenotato"
  }

  liberaAuletta() {
    this.stream.set(this.user_auletta!.numero, "")
    this.user_auletta!.prenotazione = null
    this.messaggio = "libera"
  }

  reset(full : boolean) {
    this.messaggio = null
    this.ora_fine = null
    if (full) this.user_auletta = null
  }
}