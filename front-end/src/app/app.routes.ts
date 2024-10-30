// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component')
        .then(m => m.LandingPageComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/auth/signup/signup.component')
            .then(m => m.SignupComponent)
      },
      // Aquí irá también la ruta de login cuando la creemos
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component')
            .then(m => m.LoginComponent)
      }
    ]
  }
];
