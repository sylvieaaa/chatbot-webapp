import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    FormsModule, // Make sure FormsModule is imported here
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true; // Flag to toggle between login and register modes
  errorMessage: string = '';

  formGroupLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  formGroupRegister = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  authService = inject(AuthService);

  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit() {
    console.log('is>> ', this.authService.isAuthenticatedUser());
    if (this.authService.isAuthenticatedUser()) {
      console.log('here');
      // Redirect to chat page if already logged in
      this.router.navigate(['chat']);
    }
  }

  // Toggle between login and register mode
  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  // Handle login form submission
  onSubmit(): void {
    if (!this.isLoginMode) {
      this.onSubmitRegister();
    } else {
      const payload = {
        username: this.formGroupLogin.value.username,
        password: this.formGroupLogin.value.password,
      };
      this.authService.login(payload).subscribe({
        next: (response) => {
          // Navigate to the chat page on successful login
          this.router.navigate(['/chat']);
        },
        error: (error: HttpErrorResponse) => {
          console.log('error> ', error);
          if (error.error.detail) {
            this.toastr.error(error.error.detail, 'Login Failed');
          } else {
            this.toastr.error('An unknown error occurred.', 'Login Failed');
          }
        },
      });
    }
  }

  // Handle register form submission
  onSubmitRegister(): void {
    const payload = {
      username: this.formGroupRegister.value.username,
      email: this.formGroupRegister.value.email,
      password: this.formGroupRegister.value.password,
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.toastr.success('Registration Successful!');
        this.isLoginMode = true;
      },
      error: (error) => {
        console.log('error> ', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.toastr.error(error.error.detail, 'Registration Failed');
      },
    });
  }

  checkIfDisabled(): boolean {
    if (this.isLoginMode) {
      return this.formGroupLogin.valid ? false : true;
    } else {
      return this.formGroupRegister.valid ? false : true;
    }
  }
}
