import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/dataservice.service';
import { OLDPrenotazione } from '../../tools/Comunita';
import { collection } from '@angular/fire/firestore';

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

  prenotazioni : {[key : string] : OLDPrenotazione[]} = {}

  constructor(private auth: AuthService, public dataService: DataService) {
    this.dataService.getCollection<{lato: string}>(this.dataService.lavatriceRef, 'lato').subscribe((lista)=>{
      console.log("DB", lista)
      for (var lavatrice of lista) this.aggiornaLato(lavatrice.lato)
      console.log("Prenotazioni", this.prenotazioni)
    })
  }

  aggiornaLato(lato : string) { 
    this.dataService.getCollection<OLDPrenotazione>(collection(this.dataService.firestore, this.dataService.lavatriceRef.path + "/" + lato + "/prenotazioni"), "pid").subscribe((values) => {
      this.prenotazioni[lato] = values
    })
  }

  prenotazioneStyle(prenotazione : OLDPrenotazione){
    const hour2px = (hour : [number, number]) =>{
      return Math.floor((hour[0]*2 + hour[1]/30)*this.cell_height)
    }

    var style = {
      'top': hour2px(prenotazione.ora_inizio) + "px",
      'height': (hour2px(prenotazione.ora_fine) - hour2px(prenotazione.ora_inizio))+ "px",
    }

    return style
  }

  lavatrice_dialog = inject(MatDialog)

  timeToArr(input: string) : [number, number] {
    var s = input.split(":")
    return [parseInt(s[0]), parseInt(s[1])]
  }

  prenota(lato: string, event: MouseEvent) {
    var y_offset = (event.target as HTMLElement).parentElement!.getBoundingClientRect().top
    var y_scroll = (event.target as HTMLElement).parentElement!.scrollTop
    var screen_y = event.y + y_scroll - y_offset
    var cells = screen_y/this.cell_height
    console.log(event.y, y_scroll, y_offset)

    var fifteen_cell = 1/2

    cells = Math.round(cells/fifteen_cell)*fifteen_cell

    var hour = Math.floor(cells/2).toString().padStart(2, '0') 
    var minutes = Math.floor((cells%2)*30).toString().padStart(2, '0')
    

    const dialogRef = this.lavatrice_dialog.open(LavatriceDialog, {
      data: {aula: lato, ora_inizio: hour + ":" + minutes, ora_fine : ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.addCollection({
          studente: this.auth.userUID()!,
          ora_inizio : this.timeToArr(result.ora_inizio),
          ora_fine : this.timeToArr(result.ora_fine),
        }, collection(this.dataService.firestore, this.dataService.lavatriceRef.path + "/" + lato + "/prenotazioni"))
      }
    })
  }  
}

@Component({
  selector: 'lavatrice-dialog',
  templateUrl: 'lavatrice_dialog.html',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class LavatriceDialog {
  readonly dialogRef = inject(MatDialogRef<LavatriceDialog>);
  readonly data = inject<OLDPrenotazione>(MAT_DIALOG_DATA);
  readonly ora_fine = model(this.data.ora_fine);

  onNoClick(): void {
    this.dialogRef.close();
  }
}