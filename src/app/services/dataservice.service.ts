import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  items$ : Observable<{abc: string}> = from([{abc: "tua mamma"}]);
  firestore : Firestore = inject(Firestore)


  constructor(private afs : Firestore){
    
    
  }

  testDatabase(){
    console.log("called")
    const itemCollection = collection(this.firestore, 'Test')

    this.items$ = collectionData<{abc: string}>(itemCollection)
    this.items$.subscribe(value =>{
      console.log(value)
    })

  }
}
