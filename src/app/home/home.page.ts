import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  user$: Observable<firebase.User>;
  credentials: any = { email: 'mail@example.com', password: 'admin123#' };
  constructor(private auth: AuthService) {
    this.user$ = this.auth.user;
  }

  signIn() {
    this.auth.signIn(this.credentials.email, this.credentials.password).subscribe();
  }

  signUp() {
    this.auth.signUp(this.credentials.email, this.credentials.password).subscribe();
  }

  signOut() {
    this.auth.signOut().subscribe();
  }
}
