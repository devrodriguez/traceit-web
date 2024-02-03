import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocFromCache, getDocs, getDocsFromCache } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { 
    
  }

  readPlaces() {
    const itemRef = collection(this.firestore, 'places')
    return getDocs(itemRef)
  }

  readPlaceByID(id: string) {
    const docRef = doc(this.firestore, 'places', id)
    return getDoc(docRef)
  }
}
