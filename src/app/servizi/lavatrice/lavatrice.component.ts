import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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

  prenotazioni : {[key : string] : PrenotazioneLavatrice[]} = {
    "emero": [
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
    ],
    "tv": [
      {
        studente : "Simone",
        ora_inizio : [10 , 20],
        ora_fine: [15 , 0]
      },
      {
        studente : "Simone",
        ora_inizio : [20 , 45],
        ora_fine: [21 , 0]
      },
      {
        studente : "Sucaggio",
        ora_inizio : [6 , 45],
        ora_fine: [8 , 0]
      }
    ]
  }
  

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

  lavatrice_dialog = inject(MatDialog)

  prenota(lato: string, event: MouseEvent) {
    var y_offset = (event.target as HTMLElement).parentElement!.getBoundingClientRect().top
    var y_scroll = (event.target as HTMLElement).parentElement!.scrollTop
    var screen_y = event.y + y_scroll - y_offset
    var half_cell = screen_y/this.cell_height
    var hour = Math.floor(half_cell/2)
    var minutes = Math.floor((half_cell%2)*30)

    const dialogRef = this.lavatrice_dialog.open(LavatriceDialog, {
      data: {aula: lato, ora_inizio: hour + ":" + minutes, ora_fine : ''},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prenotazioni[lato].push({
          studente: "Gay",
          // sono stringhe ma devono essere numeri !!!
          ora_inizio : result.ora_inizio.split(":"),
          ora_fine : result.ora_fine.split(":")
        })
        console.log(this.prenotazioni[lato])
      }
      
    })
    
  }
  
}@Component({
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
  readonly data = inject<PrenotazioneLavatrice>(MAT_DIALOG_DATA);
  readonly ora_fine = model(this.data.ora_fine);

  onNoClick(): void {
    this.dialogRef.close();
  }
}