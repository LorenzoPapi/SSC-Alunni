import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensa',
  standalone: true,
  imports: [],
  templateUrl: './mensa.component.html',
  styleUrl: './mensa.component.scss'
})
export class MensaComponent implements OnInit {
  URL : string = "http://www.roccoscoded.altervista.org/SSC"
  API_URL : string = URL + "/API"

  sessID : string = ""

  http = inject(HttpClient)

  login() {
    
  }

  getPrenotazioni() {
    
  }

  ngOnInit(): void {
    this.login()
  }
}
