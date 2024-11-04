import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  sidebarOpen = true;
  user: User = {
    firstName: 'Juan',
    lastName: 'Pérez',
    profileImage: '/images/avatar.png'
  };

  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Cerrar el sidebar solo si estamos en vista móvil
      if (window.innerWidth <= 768) {
        this.sidebarOpen = false;
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleProfileMenu(): void {
    console.log('Toggle profile menu');
  }

  logout(): void {
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
