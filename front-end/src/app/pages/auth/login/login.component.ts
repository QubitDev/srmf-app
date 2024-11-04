// srmf-app/front-end/src/app/pages/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs';
import { Console, error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Agregamos logging para depuración
      console.log('Formulario válido, intentando navegar al dashboard...');
      const request: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      this.authService.login(request)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/dashboard/patient'])
        }),
        catchError(error => {
          console.log(error);
          return error;
        })
      ).subscribe();



} else {
      console.log('Formulario inválido');
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
