// src/app/pages/dashboard/patient-dashboard/appointments/appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsService } from '../../../../core/services/appointments.service';
import { Appointment } from '../../interfaces/dashboard-interfaces';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  currentMonth: Date = new Date();
  weeks: Date[][] = [];
  selectedDate: Date | null = null;
  appointments: Appointment[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.generateCalendar();
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.error = null;

    this.appointmentsService.getAppointments().subscribe({
      next: (appointments) => {
        console.log('Appointments loaded:', appointments);
        this.appointments = this.transformAppointments(appointments);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.error = 'Error al cargar las citas';
        this.isLoading = false;
      }
    });
  }

  private transformAppointments(appointments: any[]): Appointment[] {
    return appointments.map(apt => ({
      id: apt.id,
      date: apt.appointmentDate,
      time: apt.appointmentTime,
      doctorName: `Dr. ${apt.doctor.user.name} ${apt.doctor.user.lastName}`,
      specialty: apt.doctor.specialty.name,
      consultingRoom: apt.doctor.consultingRoom,
      description: apt.reason || 'Sin descripción',
      status: apt.status
    }));
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    this.weeks = [];
    let currentWeek = [];
    const endDay = new Date(lastDay);
    endDay.setDate(endDay.getDate() + (6 - endDay.getDay()));

    let currentDay = new Date(startDate);

    while (currentDay <= endDay) {
      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        const nextDay = new Date(currentDay);
        currentWeek.push(nextDay);
        currentDay.setDate(currentDay.getDate() + 1);
      }
      this.weeks.push(currentWeek);
    }
  }

  previousMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  selectDate(date: Date) {
    this.selectedDate = new Date(date);
    console.log('Selected date:', this.selectedDate);
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    if (!date || !this.appointments) return [];

    return this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return this.isSameDate(appointmentDate, date);
    });
  }

  hasAppointments(date: Date): boolean {
    return this.getAppointmentsForDate(date).length > 0;
  }

  isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  isSelectedMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth();
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'PENDING': 'status-pending',
      'CONFIRMED': 'status-confirmed',
      'COMPLETED': 'status-completed',
      'CANCELLED': 'status-cancelled'
    };
    return statusClasses[status] || '';
  }
}
