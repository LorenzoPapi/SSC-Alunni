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
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'comunicazioni', component: ComunicazioniComponent , canActivate: [authGuard]},
    {path: 'calendario', component: CalendarioComponent , canActivate: [authGuard]},
    {path: 'comunita', component: ComunitaComponent , canActivate: [authGuard]},
    
    {path: 'ricerca', component: AllieviComponent , canActivate: [authGuard]},
    {path: 'admin', component: AdminComponent , canActivate: [authGuard]},
    {path: 'profilo', component: ProfiloComponent  , canActivate: [authGuard]},
    {path: 'login', component: LoginComponent}
];

