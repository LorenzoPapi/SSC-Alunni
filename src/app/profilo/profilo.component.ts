import { Component, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { AuthService } from '../services/auth.service';
import { Studente } from '../tools/Studente';
import { DataService } from '../services/dataservice.service';

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

  constructor(private fb: FormBuilder, public auth: AuthService, private dataService : DataService ) {
    this.userForm = this.fb.group({});
    this.userSignal = auth.currentUserSig;
    this.dataService.getCollection<Studente>(this.dataService.studentiRef, "studenti").subscribe((value) => {
      console.log(value)
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
      nome: [user?.nome],
      cognome: [user?.cognome],
      facolta : [user?.facolta],
      stanza: [user?.stanza],
      telefono : [user?.telefono],
      descrizione : [user?.descrizione]
    });
  }

  salva() {
    if (!this.userForm.invalid) {
      this.userSignal.update((studente) => {
        var updated : Studente = {};
        updated.nome = this.userForm.get("nome")?.value
        updated.cognome = this.userForm.get("cognome")?.value
        updated.descrizione = this.userForm.get("descrizione")?.value
        updated.facolta = this.userForm.get("facolta")?.value
        updated.stanza = this.userForm.get("stanza")?.value
        updated.telefono = this.userForm.get("telefono")?.value
        return updated
      })
      this.edit = false
    }   
  }
}