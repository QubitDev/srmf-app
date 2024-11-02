import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  profileImage: string;
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
  // Propiedades
  sidebarOpen = true;
  user: User = {
    firstName: 'Juan',
    lastName: 'Pérez',
    profileImage: '/images/avatar.png'
  };

  constructor(private router: Router) {}

  // Métodos
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleProfileMenu(): void {
    // Implementar lógica del menú de perfil
    console.log('Toggle profile menu');
  }

  logout(): void {
    // Por ahora solo navegaremos a la página principal
    this.router.navigate(['/']);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
