import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UserPreferences } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserPrefService {
  private user: firebase.User;
  private userPrefs: UserPreferences;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.user$.subscribe(user => (this.user = user));
  }

  setUserPreferences(userPrefs: UserPreferences) {
    const collection = this.afs.collection<UserPreferences>('userPrefs');
    this.userPrefs = userPrefs;
    collection.doc(this.user.uid).set(this.userPrefs);
  }

  get userPreferences$(): Observable<UserPreferences> {
    if (!this.user) {
      return EMPTY;
    }
    return this.afs
      .doc<UserPreferences>(`userPrefs/${this.user.uid}`)
      .valueChanges()
      .pipe(tap(userPrefs => (this.userPrefs = userPrefs)));
  }

  updateUserPreferences(newUserPrefs: UserPreferences | any) {
    this.afs
      .doc<UserPreferences>(`userPrefs/${this.user.uid}`)
      .set({ ...this.userPrefs, ...newUserPrefs });
  }
}
