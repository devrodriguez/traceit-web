import { Injectable } from '@angular/core';

import { Firestore, addDoc, collectionData, doc, getDoc, getDocs } from '@angular/fire/firestore'
import { collection } from '@angular/fire/firestore';

import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private firestore: Firestore) {
  }

  readItems() {
    const itemRef = collection(this.firestore, 'items')
    return getDocs(itemRef)
  }

  readItemByID(id: string) {
    const docRef = doc(this.firestore, 'items', id)
    return getDoc(docRef)
  }

  saveItem(item: Item) {
    const itemRef = collection(this.firestore, 'items')
    return addDoc(itemRef, item)
  }
}
