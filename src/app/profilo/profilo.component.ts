import { Component, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { AuthService } from '../services/auth.service';
import { Studente } from '../tools/Studente';
import { DataService } from '../services/dataservice.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  edit: boolean = false;

  userForm : FormGroup;
  userSignal : WritableSignal<Studente | null | undefined>;
  userId : string = ""
  

  constructor(private fb: FormBuilder, public auth: AuthService, private dataService : DataService ) {
    this.userForm = this.fb.group({});
    this.userSignal = auth.currentUserSig;
    this.auth.user$.subscribe((user) => {
      if (!!user) this.userId = user?.uid
    })
  }

  ngOnInit() {
    
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

  modifica() {
    this.edit = true
    var user = this.userSignal();
    this.userForm = this.fb.group({
      nome: [user?.nome, Validators.maxLength(40)],
      cognome: [user?.cognome, Validators.maxLength(40)],
      facolta : [user?.facolta],
      stanza: [user?.stanza, Validators.maxLength(10)],
      telefono : [user?.telefono],
      descrizione : [user?.descrizione, Validators.maxLength(2000)]
    });
  }

  salva() {
    if (this.userForm.valid) {
      var updated : Studente = {};
      updated.nome = this.userForm.get("nome")?.value
      updated.cognome = this.userForm.get("cognome")?.value
      updated.descrizione = this.userForm.get("descrizione")?.value
      updated.facolta = this.userForm.get("facolta")?.value
      updated.stanza = this.userForm.get("stanza")?.value
      updated.telefono = this.userForm.get("telefono")?.value
      this.dataService.setCollection<Studente>(this.userId, updated, this.dataService.studentiRef)
      this.userSignal.set(updated)
      this.edit = false
    } else {
        for (const name in this.userForm.controls) {
          if (this.userForm.controls[name].invalid)
            console.log(name)
        }
    }
  }
}