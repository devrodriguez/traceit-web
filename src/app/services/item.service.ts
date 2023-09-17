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
  onSnapshot} from '@angular/fire/firestore';

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

  readItemByID(id: string) {
    const docRef = doc(this.firestore, 'items', id)
    return getDoc(docRef)
  }

  saveItem(item: Item) {
    const itemRef = collection(this.firestore, 'items')
    return addDoc(itemRef, item)
  }
}
