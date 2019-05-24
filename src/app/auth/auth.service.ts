import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) {}

  signUp(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInAnonymously() {
    this.firebaseAuth.auth.signInAnonymously();
  }

  signInWithFacebook() {
    this.firebaseAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  signOut() {
    this.firebaseAuth.auth.signOut();
  }

  get user$(): Observable<firebase.User> {
    return this.firebaseAuth.user;
  }
}
