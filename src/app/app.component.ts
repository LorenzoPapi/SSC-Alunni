import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion'; 
import { DataService } from './services/dataservice.service';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouteService } from './services/route.service';

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
  
  constructor(private dataService: DataService){

  }

  ngOnInit(){
    console.log("using service")
    this.dataService.testDatabase()
    
  }
}
