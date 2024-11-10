import { ChangeDetectionStrategy, Component, effect, model } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker'

export interface Event{
  ora_inizio : [number, number]
  ora_fine : [number, number]
  giorno : number
  mese: number
  titolo: string
  descrizione: string
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarioComponent {
  selected = model<Date | null>(null);
  my_effect = effect(()=>{
    console.log("somthing wrong")
  })

  events = [
    {month: 10, day:5, color:"blue"},
    {month: 10, day:20, color:"red"},
    {month: 10, day:11, color:"green"},
    {month: 10, day:10, color:"green"}
  ]

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    console.log(cellDate.getDate(), cellDate.getMonth())
    if (view === 'month') {
      for (const event of this.events) {
        if (cellDate.getDate() === event.day && cellDate.getMonth() === event.month) {
          return event.color + '-marker';
        }
      }
    }

    return '';
  };
}
