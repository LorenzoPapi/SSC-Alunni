import { Routes } from '@angular/router';
import { ComunicazioniComponent } from './comunicazioni/comunicazioni.component';
import { CalendarioComponent } from './calendario/calendario.component';

export const routes: Routes = [
    {path: 'comunicazioni', component: ComunicazioniComponent},
    {path: 'calendario', component: CalendarioComponent},
    {path: 'comunita', component: CalendarioComponent},
    {path: 'ricerca', component: CalendarioComponent},
    {path: 'admin', component: CalendarioComponent},
];
