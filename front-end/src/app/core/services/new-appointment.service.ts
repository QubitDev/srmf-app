// src/app/core/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AppointmentRequest,
  AppointmentResponse,
  TimeSlotResponse,

} from '../interfaces/appointment.interface';
import { AppointmentStatus } from '../interfaces/appointment.interface';
import{ Doctor} from '../interfaces/doctor.interface';
import{ Specialty} from '../interfaces/specialty.interface';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.baseUrl}/specialties`);
  }

  // Opción 1: Obtener doctores por ID de especialidad
  getDoctorsBySpecialty(specialtyId: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctor/doctors/specialty/${specialtyId}`);
  }

  // Opción 2: Obtener doctores por nombre de especialidad
  getDoctorsBySpecialtyName(specialtyName: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctor/specialty-name/${specialtyName}`);
  }

  getAvailableTimeSlots(doctorId: string, date: string): Observable<{availableTimeSlots: string[]}> {
    return this.http.get<{availableTimeSlots: string[]}>(`${this.baseUrl}/appointments/available-slots`, {
      params: { doctorId, date }
    });
  }

  createAppointment(appointmentRequest: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.baseUrl}/appointments`, appointmentRequest);
  }
}
