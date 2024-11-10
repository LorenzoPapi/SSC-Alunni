import { ChangeDetectionStrategy, Component, effect, model } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'

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
}
