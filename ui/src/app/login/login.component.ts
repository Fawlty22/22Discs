import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
// import { UserService } from '../core/services/user.service';
import { take, tap } from 'rxjs';
import { MaterialModule } from '../shared/modules/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  signUpMode: boolean = false;
  signUpForm: FormGroup;
  hidePassword: boolean = true;
  //  private userService: UserService
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signUpForm = this.fb.group({
      id: [0],
      pdgaNumber: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user'],
    });
  }

  onLogin() {
    // this.authService.login(this.loginForm.value);
  }

  onSignup() {
    // this.userService.createUser(this.signUpForm.value)
    // .pipe(tap(newUser => {
    //   this.signUpForm.reset;
    //   this.toggleSignUpMode();
    // }),take(1))
    // .subscribe()
  }

  toggleSignUpMode() {
    this.signUpMode = !this.signUpMode;
  }
}
