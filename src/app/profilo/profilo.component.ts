import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  welcome = "Non loggato!";
  constructor(private cookieService: CookieService) {
    
  }

  ngOnInit() {
    if (this.cookieService.check("user")) {
      console.log("Loggato!")
      this.welcome = "Benvenuto " + this.cookieService.get("user") + "!"
    } else {
      console.log("Non loggato!!")
    }
  }
}
