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
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component')
            .then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/auth/signup/signup.component')
            .then(m => m.SignupComponent)
      }
    ]
  },
  {
    path: 'dashboard/patient',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/patient-dashboard/appointments/patient-dashboard.component')
            .then(m => m.PatientDashboardComponent)
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('../app/pages/dashboard/patient-dashboard/appointments/patient-dashboard.component')
            .then(m => m.PatientDashboardComponent)
      },
      {
        path: 'new-appointment',
        loadComponent: () =>
          import('../app/pages/dashboard/patient-dashboard/new-appointment/new-appointment.component')
            .then(m => m.NewAppointmentComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../app/pages/dashboard/patient-dashboard/profile/profile.component')
            .then(m => m.ProfileComponent)
      }
    ]
  }
];

export default routes;
