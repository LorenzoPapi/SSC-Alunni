import { Routes } from '@angular/router';
import { ComunicazioniComponent } from './comunicazioni/comunicazioni.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { LoginComponent } from './login/login.component';
import { AllieviComponent } from './allievi/allievi.component';
import { ServiziComponent } from './servizi/servizi.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {path: 'comunicazioni', component: ComunicazioniComponent},
    {path: 'calendario', component: CalendarioComponent},
    {path: 'comunita', component: ServiziComponent},
    {path: 'ricerca', component: AllieviComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'profilo', component: ProfiloComponent},
    {path: 'login', component: LoginComponent}
];
