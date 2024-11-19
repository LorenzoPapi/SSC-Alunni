import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion'; 
import { RouteService } from './services/route.service';
import { User } from '@angular/fire/auth';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { AuthService } from './services/auth.service';
import { lastValueFrom, map } from 'rxjs';
import { DataService } from './services/dataservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatExpansionModule, 
    CommonModule, 
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sscapp';
  routerService = inject(RouteService)
  authService = inject(AuthService)
  router = inject(Router)
  dataService = inject(DataService)

  constructor( ){

  }

  ngOnInit(){
    //this.dataService.uff()
    this.authService.user$.subscribe((user : User | null) =>{
      console.log("user", user)
      if (user == null){
        this.authService.currentUserSig.set(null)
        this.router.navigate(['/login'])
      }else{
        this.authService.currentUserSig.set({nome:  user.email!})
        console.log(this.authService.currentUserSig())
        if (this.router.url == '/login'){
          this.router.navigate(['/calendario'])
        }
      }
    })
  }
}
