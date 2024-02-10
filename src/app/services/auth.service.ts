import { Injectable, NgZone } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData: any

  authState = new BehaviorSubject<any | null>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user: any) => {
      this.authState.next(user)
    })
  }

  getAuthUser() {
    return this.auth.currentUser
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logOut() {
    return signOut(this.auth)
  }
}
