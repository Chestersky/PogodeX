import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor(private authService: AuthService) {}

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  ngOnInit() {}

  onSubmit() {
    this.authService.signUp(this.profileForm.value.email, this.profileForm.value.password);
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook();
  }
}
