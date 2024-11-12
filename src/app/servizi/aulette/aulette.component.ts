import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';

import { MatListModule} from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {MatCardModule } from '@angular/material/card';

import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



export interface Auletta{
  numero: string;
  occupata : null | {
    studente : string 
    ora_inizio : string 
    ora_fine : string
  }
}

export interface AulettaData{
  numero : string;
  bonus: number;
  ora_fine : string;
}

@Component({
  selector: 'app-aulette',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './aulette.component.html',
  styleUrl: './aulette.component.scss',
  viewProviders: []
})
export class AuletteComponent {
  aulette : Auletta[] = [
    {
      numero: '1-19',
      occupata : null
    },
    {
      numero: "1-20",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-21",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-22",
      occupata :  null
    },
    {
      numero: "1-23",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-20",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-21",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-22",
      occupata :  null
    },
    {
      numero: "1-23",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-20",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-21",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    },
    {
      numero: "1-22",
      occupata :  null
    },
    {
      numero: "1-23",
      occupata :  {
        studente : "Simone Cutrona", 
        ora_inizio : "16:00",
        ora_fine : "17:00"
      }
    }
  ]

  auletta_dialog = inject(MatDialog)

  user_auletta : null | AulettaData = null

  selectAuletta(auletta : string) {
    const dialogRef = this.auletta_dialog.open(AulettaDialog, {
      data: {numero: auletta, bonus : 2, ora_fine : ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.user_auletta = result;
        console.log(result)
      }else{
        //non so percheh ho scritot questa linea 
        //potrei rimuoverla al posto di crivere commenti inutili 
        //non penso lo faro 
        //mi annoio
        this.user_auletta = null;
      }
    });
  }
}


@Component({
  selector: 'auletta-dialog',
  templateUrl: 'auletta_dialog.html',
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
export class AulettaDialog {
  readonly dialogRef = inject(MatDialogRef<AulettaDialog>);
  readonly data = inject<AulettaData>(MAT_DIALOG_DATA);
  readonly ora_fine = model(this.data.ora_fine);

  onNoClick(): void {
    this.dialogRef.close();
  }
}