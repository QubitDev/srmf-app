// src/app/core/services/appointments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../pages/dashboard/interfaces/dashboard-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
     console.log('Fetching appointments from API:', this.apiUrl);
    return this.http.get<Appointment[]>(this.apiUrl);
  }
}
