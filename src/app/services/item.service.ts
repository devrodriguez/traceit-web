import { Injectable } from '@angular/core';

import { Firestore, addDoc, collectionData, getDocs } from '@angular/fire/firestore'
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

  saveItem(item: Item) {
    const itemRef = collection(this.firestore, 'items')
    return addDoc(itemRef, item)
  }
}
