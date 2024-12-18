import { Component, computed, inject, OnDestroy, Signal } from '@angular/core';

import { MatListModule } from '@angular/material/list';
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
import { httpsCallable } from '@angular/fire/functions';

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
  
  // TODO: cercare di cambiarlo in un signal per controllare quando la prenotazione non va a buon fine
  user_auletta : Auletta | null = null

  messaggio : string | null = null

  ora_fine : string | null = null

  dataService = inject(DataService)

  auth = inject(AuthService)

  stream = this.dataService.connectToStream<any>(this.dataService.auletteRef)

  aulette : Signal<Auletta[]> = computed(() => {
    return Object.entries(this.stream.signal()!).map((e : [string, any]) => {
      var auletta = {
        numero: e[0],
        prenotazione: e[1]
      }

      if (!!auletta.prenotazione && auletta.prenotazione.studente == this.auth.userUID()!) {
        this.user_auletta = auletta
      } else if (!!this.user_auletta && this.user_auletta.numero == auletta.numero) {
        this.user_auletta = null
      }
      
      return auletta
    }).sort((a, b) => parseInt(a.numero) - parseInt(b.numero))
  })
  
  ngOnDestroy(): void {
    this.stream.unsubscribe()
  }

  disabilitata(auletta : Auletta) : boolean {
    return (!!this.user_auletta && this.user_auletta.numero != auletta.numero) || (!!auletta.prenotazione && auletta.prenotazione.studente != this.auth.userUID()) 
  }

  timestampToHM(ts: number) {
    var data = new Date(ts * 1000)
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
    this.messaggio = null;
    //TODO: si, fa schifo, ma perora mi va bene
    var fineArr = [parseInt(this.ora_fine!.split(":")[0]), parseInt(this.ora_fine!.split(":")[1])]
    var fineData = new Date()
    if (fineData.getHours() >= 18 && fineArr[0] < 6)
      fineArr[0] += 24
    fineData.setHours(fineArr[0], fineArr[1], 0)
    console.log(fineData)

    var prenotazione = {
      ora_fine: Math.floor(fineData.getTime() / 1000),
      studente: this.auth.userUID()!
    }
    
    const prenota = httpsCallable(this.dataService.functions, "prenotaAuletta");
    prenota(prenotazione).then((result: any) => {
      this.stream.set(this.user_auletta!.numero, {
        ...prenotazione,
        ora_inizio: result.data.c
      })
      this.messaggio = "prenotato"
    }, (_) => {
      this.messaggio = "errore"
    })
  }

  liberaAuletta() {
    this.stream.set(this.user_auletta!.numero, "")
    this.messaggio = "libera"
  }

  reset(full : boolean) {
    this.messaggio = null
    this.ora_fine = null
    if (full) this.user_auletta = null
  }
}