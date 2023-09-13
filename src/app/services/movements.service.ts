import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { Movement } from '../interfaces/movement';
import { Item } from '../interfaces/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private firestore: Firestore) { }

  readMovements() {
    const collRef = collection(this.firestore, 'movements')
    return getDocs(collRef)
  }

  readMovementsByItem(itemID: string) {
    const collRef = collection(this.firestore, 'movements')
    return getDocs(
      query(
        collRef,
        where('item.id', '==', itemID)
      )
    )
  }

  createMovement(movement: Movement) {
    const collRef = collection(this.firestore, 'movements')
    return addDoc(collRef, movement)
  }
}
