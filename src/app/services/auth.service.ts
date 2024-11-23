import { inject, Injectable, signal } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateCurrentUser, updatePhoneNumber, updateProfile, User, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Studente } from '../tools/Studente';
import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth)
  user$ : Observable<User | null> = authState(this.auth)

  currentUserSig = signal<Studente | undefined | null>(undefined)

  constructor(private data: DataService) { }

  login(username: string, password: string){
    return signInWithEmailAndPassword(this.auth, `${username}@ssc.studenti.it`, password)
  }

  register(username: string, password: string){
    return createUserWithEmailAndPassword(this.auth, `${username}@ssc.studenti.it`, password)
  }

  updateUser(user: User, nome : string, cognome : string, telefono : string) {
    this.data.setCollection(user.uid, {
      nome: nome,
      cognome: cognome,
      telefono: telefono,
      email: user.email
    }, this.data.studentiRef)
    updateCurrentUser(this.auth, user)
  }

  logout(){
    signOut(this.auth)
  }
}
