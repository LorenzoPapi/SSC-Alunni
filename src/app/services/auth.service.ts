import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateCurrentUser, User, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { Studente } from '../tools/Studente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth)
  user$ : Observable<User | null> = user(this.auth)
  currentUserSig = signal<Studente | undefined | null>(undefined)

  constructor() { }

  login(username: string, password: string){
    signInWithEmailAndPassword(this.auth, `${username}@ssc.studenti.it`, password).then(()=>{
      
    }, (err)=>{
      console.log(err)
    })
  }

  register(username: string, password: string){
    var promise = createUserWithEmailAndPassword(this.auth, `${username}@ssc.studenti.it`, password)
      .then((response)=>{
        return updateCurrentUser(this.auth, response.user)
      }, (err)=>{
        console.log(err)
    })
    return from(promise)  
  }

  logout(){
    signOut(this.auth)
  }
}
