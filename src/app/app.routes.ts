import { Routes } from '@angular/router';
import { ComunicazioniComponent } from './comunicazioni/comunicazioni.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'comunicazioni', component: ComunicazioniComponent},
    {path: 'calendario', component: CalendarioComponent},
    {path: 'comunita', component: CalendarioComponent},
    {path: 'ricerca', component: CalendarioComponent},
    {path: 'admin', component: CalendarioComponent},
    {path: 'profilo', component: ProfiloComponent},
    {path: 'login', component: LoginComponent}
];
