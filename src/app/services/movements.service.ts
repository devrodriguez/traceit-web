import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Movement } from '../interfaces/movement';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private firestore: Firestore) { }

  readMovements() {
    const collRef = collection(this.firestore, 'movements')
    return getDocs(collRef)
  }

  async readMovementsByItem(itemID: string) {
    const collRef = collection(this.firestore, 'movements')
    const docsData = await getDocs(
      query(
        collRef,
        where('item.id', '==', itemID),
      )
    )

    return docsData.docs.map(r => {
      return {
        id: r.id, 
        ...r.data()
      } as Movement
    })
  }

  readItemsByPlace(placeID: string) {
    const collRef = collection(this.firestore, 'movements')
    return getDocs(
      query(
        collRef,
        where('place.id', '==', placeID)
      )
    )
  }

  createMovement(movement: Movement) {
    const collRef = collection(this.firestore, 'movements')
    return addDoc(collRef, movement)
  }
}
