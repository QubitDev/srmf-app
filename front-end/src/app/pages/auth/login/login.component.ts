import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Redirigir según el rol
          switch (response.user.role) {
            case 'admin':
              this.router.navigate(['/dashboard/admin']);
              break;
            case 'doctor':
              this.router.navigate(['/dashboard/doctor']);
              break;
            case 'patient':
              this.router.navigate(['/dashboard/patient']);
              break;
            default:
              this.loginError = 'Rol no válido';
          }
        },
        error: (error) => {
          this.loginError = 'Credenciales inválidas';
          console.error('Error de login:', error);
        }
      });
    } else {
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
