import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion'; 
import { RouteService } from './services/route.service';
import { User } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatExpansionModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sscapp';
  routerService = inject(RouteService)
  authService = inject(AuthService)
  router = inject(Router)
  constructor( ){

  }

  ngOnInit(){
    console.log("using service")
    
    this.authService.user$.subscribe((user : User | null)=>{
      this.authService.currentUserSig.set( (user == null) ? null : {nome:  user.email!})
      console.log("navigatng")
      this.router.navigate(['/calendario'])
    })
    
  }
}
