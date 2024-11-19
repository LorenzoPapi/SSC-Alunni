import { computed, Inject, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, collectionData, Firestore, Unsubscribe } from '@angular/fire/firestore';
import { BehaviorSubject, from, map, Observable, Subscription } from 'rxjs';

import { 
  child, get, query, ref, set, getDatabase, onChildAdded, onValue, orderByChild, startAfter, 
  DatabaseReference, Query,
  onChildChanged,
  onChildRemoved} from '@angular/fire/database';
import { Auletta, Lavatrice } from '../tools/Comunita';


export interface StreamConnection<T>{
  subscribe: (callback: (value: {[key: number]: T}) => void) => Subscription
  unsubscribe: ()=>void
  get: ()=>{ [key: number]: T; }
  set: (key: number, value: T) => void
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  items$ : Observable<{abc: string}> = from([{abc: "tua mamma"}]);
  firestore : Firestore = inject(Firestore)
  app = inject(FirebaseApp)
  url = 'https://sscapp-b5645-default-rtdb.europe-west1.firebasedatabase.app'
  db = getDatabase(this.app, this.url);

  mensaRef = ref(this.db, '/mensa');
  auletteRef = ref(this.db, '/aulette');
  lavatriceRef = ref(this.db, '/lavatrice');

  comunicazioniRef = ref(this.db, '/comunicazioni');
  eventiRef = ref(this.db, '/eventi');

  testRef = ref(this.db, '/test')

  mensaStream? : BehaviorSubject<string> 
  auletteStream? : StreamConnection<Auletta> 
  lavatriceStream? : StreamConnection<Lavatrice> 

  constructor(){
    //this.listenForNewMessages()
    var obj = this.connectToStream<string>(this.testRef)
  
    var count = 0
    obj.subscribe((value)=>{
      console.log(
        Object.entries(value)
          .sort((a,b) => parseInt(a[0]) - parseInt(b[1]))
          .map(value => value[1])
      )
      count += 1
      if (count > 15){
        obj.unsubscribe()
      }
    })

    //this.testSetDatabase()
    //this.testValueDatabase()
  }

  testFirestore(){
    console.log("called")
    const itemCollection = collection(this.firestore, 'Test')

    this.items$ = collectionData<{abc: string}>(itemCollection)
    this.items$.subscribe(value =>{
      console.log(value)
    })
  }

  testSetDatabase(){
    set(ref(this.db, 'users/uffa'), {
      username: "io",
      email: "mi",
      profile_picture : "sparo"
    });
  }

  uff(){

    get(child(ref(this.db), 'coso1')).then((snapshot) => {
      if (snapshot.exists()) {
        const entryData = snapshot.val();
        console.log(entryData);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  }

  testGetDatabase(){
    onValue(this.testRef, (snapshot) => {
      console.log(snapshot.val())
    }, {
      onlyOnce: true
    });
  }

  connectToStream<T>(ref : DatabaseReference) : StreamConnection<T>{
    const dataSubject = new BehaviorSubject<{[key: number]: T}>({});

    const updateData = (key: string, value: T | null) => {
        const obj = { ...dataSubject.value };
        const parsedKey = parseInt(key);
        if (value === null) { delete obj[parsedKey] } else { obj[parsedKey] = value}
        dataSubject.next(obj);
    };
    const added   = onChildAdded  (ref, snapshot => updateData(snapshot.key!, snapshot.val()));
    const changed = onChildChanged(ref, snapshot => updateData(snapshot.key!, snapshot.val()))
    const removed = onChildRemoved(ref, snapshot => updateData(snapshot.key!, null));
    const _unsubscribe = () => {added();changed();removed();dataSubject.complete();};

    return {
      subscribe: (callback: (value: {[key: number]: T}) => void) => dataSubject.subscribe(callback),
      unsubscribe: _unsubscribe,
      get: ()=>dataSubject.getValue(),
      set: (key: number, value: T) => set(child(ref, key.toString()), value)
    };
  }
}
