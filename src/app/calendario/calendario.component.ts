import { ChangeDetectionStrategy, Component, effect, model } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker'
import { DataService } from '../services/dataservice.service';

export interface Event{
  start_time : [number, number]
  end_time : [number, number]
  day : number
  month: number
  title: string
  description: string
  type : "Colloquia" | "Corso" | "Assemblea" | "Festa"
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

  events: Event[] = []

  color_map = {
    "Colloquia" : "red",
    "Corso": "blue",
    "Assemblea": "green",
    "Festa": "purple"
  }
  
  next_event : Event | null = null;
  
  selected_event : Event | null = null;
  
  dateClass: MatCalendarCellClassFunction<Date> = () => 'no-marker';

  constructor(private dataService: DataService) {
    dataService.getCollection<Event>(this.dataService.calendarioRef, "uid").subscribe((events) => {
      this.events = events

      this.dateClass = (cellDate, view) => {
        if (view === 'month') {
          for (const event of this.events) {
            if (cellDate.getDate() === event.day && cellDate.getMonth() === event.month) {
              return this.color_map[event.type] + '-marker';
            }
          }
        }
        return 'no-marker';
      }

      var day = new Date().getDate()
      var month = new Date().getMonth()

      for (var event of this.events){
        if (day <= event.day && month <= event.month){
          if (this.next_event == null){
            this.next_event = event
          }else{
            if (event.month == this.next_event.month){
              if (event.day <= this.next_event.day){
                this.next_event = event
              }
            }else if(event.month < this.next_event.month){
              this.next_event = event
            }
          }
        }
      }
    })
  }

  openPopUp(){
    if (this.selected() == null){
      this.selected_event == null
    }else{
      this.selected_event =  null
      for (const event of this.events) {
        if (this.selected()!.getDate() === event.day && this.selected()!.getMonth() === event.month) {
          this.selected_event = event
          break
        }
      }
    }
    this.selected.set(null);
  }

  closePopUp(){
    this.selected_event = null
  }  
}
