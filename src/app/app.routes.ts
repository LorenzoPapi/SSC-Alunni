import { RouterModule, Routes } from '@angular/router';
import { ComunicazioniComponent } from './comunicazioni/comunicazioni.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { LoginComponent } from './login/login.component';
import { AllieviComponent } from './allievi/allievi.component';
import { ComunitaComponent } from './comunita/comunita.component';
import { AdminComponent } from './admin/admin.component';
import { AuletteComponent } from './servizi/aulette/aulette.component';
import { MensaComponent } from './servizi/mensa/mensa.component';
import { LavatriceComponent } from './servizi/lavatrice/lavatrice.component';

export const routes: Routes = [
    {path: 'comunicazioni', component: ComunicazioniComponent},
    {path: 'calendario', component: CalendarioComponent},
    {path: 'comunita', component: ComunitaComponent},
    
    {path: 'ricerca', component: AllieviComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'profilo', component: ProfiloComponent},
    {path: 'login', component: LoginComponent}
];

