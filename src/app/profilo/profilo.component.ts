import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';


import {MatFormFieldModule} from '@angular/material/form-field'; 

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  welcome = "Non loggato!";

  userForm : FormGroup;

  constructor(private cookieService: CookieService, private fb: FormBuilder) {
      this.userForm = this.fb.group({
        nome: [''],
        cognome: [''],
        facolta : [''],
        telefono : [''],
        email: [''],
        descrizione : ['']
      });
  }

  ngOnInit() {
    if (this.cookieService.check("user")) {
      console.log("Loggato!")
      this.welcome = "Benvenuto " + this.cookieService.get("user") + "!"
    } else {
      console.log("Non loggato!!")
    }
  }

  formatPhoneNumber(event: any){
    if (event.target != null){
      let phoneNumber: string = event.target.value;

      // Rimuovi tutti i caratteri non numerici
      phoneNumber = phoneNumber.replace(/\D/g, '');

      // Formatta il numero di telefono come nnn-nnn-nnnn
      if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
        phoneNumber = phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3);
      } else if (phoneNumber.length > 6) {
        phoneNumber = phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3, 6) + ' ' + phoneNumber.slice(6);
      }

      // Aggiorna il valore nell'input
      this.userForm.get('telefono')?.setValue(phoneNumber);
    }
  }
}
