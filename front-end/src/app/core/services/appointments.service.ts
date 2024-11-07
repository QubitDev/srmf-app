// src/app/core/services/appointments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../pages/dashboard/interfaces/dashboard-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAppointments(): Observable<Appointment[]> {
    console.log('Fetching appointments from API');
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`, {
      headers: this.getAuthHeaders()
    });
  }

  getPatientAppointments(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/patient/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getDoctorAppointments(doctorId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/doctor/${doctorId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getAppointmentsByDate(date: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/date/${date}`, {
      headers: this.getAuthHeaders()
    });
  }
}
