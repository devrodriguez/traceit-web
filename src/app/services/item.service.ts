import { Injectable, inject } from '@angular/core';

import { 
  Firestore, 
  CollectionReference, 
  addDoc,
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  collectionData,
  Query,
  where,
  collectionChanges,
  queryEqual,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  onSnapshot,
  orderBy} from '@angular/fire/firestore';

import { Item } from '../interfaces/item';
import { Observable } from 'rxjs';

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

  readItemsSnap() {
    const collRef = collection(this.firestore, 'items')
    const qr = query(collRef, orderBy('createdAt', 'desc'))
    return collectionData(qr, { idField: 'id' }) as Observable<Item[]>
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
