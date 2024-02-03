import { Injectable } from '@angular/core';
import { Firestore, getDocs, addDoc, collection, query, orderBy, collectionData } from '@angular/fire/firestore';
import { Operator } from '../interfaces/operator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor(private firestore: Firestore) { }

  readOperator() {
    const collRef = collection(this.firestore, 'operators')
    return getDocs(collRef)
  }

  readOperatorSnap() {
    const collRef = collection(this.firestore, 'operators')
    const q = query(collRef, orderBy('createdAt', 'desc'))
    return collectionData(q, { idField: 'id'}) as Observable<Operator[]>
  }

  createOperator(item: Operator) {
    item.createdAt = new Date().toISOString()
    const collRef = collection(this.firestore, 'operators')
    return addDoc(collRef, item)
  }


}
