import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  signUp(email: string, password: string) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/']))
      .then(() => this.displayToast('Pomyślnie utworzono konto'));
  }

  signIn(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/']))
      .then(() => this.displayToast('Zalogowano pomyślnie'));
  }

  signInAnonymously() {
    this.firebaseAuth.auth.signInAnonymously();
  }

  signInWithFacebook() {
    this.firebaseAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then(() => this.router.navigate(['/']))
      .then(() => this.displayToast('Zalogowano pomyślnie'));
  }

  signOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.displayToast('Wylogowano');
    });
  }

  async displayToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      showCloseButton: true
    });
    toast.present();
  }

  get user$(): Observable<firebase.User> {
    return this.firebaseAuth.user;
  }
}
