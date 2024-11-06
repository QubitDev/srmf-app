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
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  currentMonth: Date = new Date();
  weeks: Date[][] = [];
  selectedDate: Date | null = null;
  appointments: Appointment[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    console.log('Component initialized');
    this.generateCalendar();
    this.getAppointments();
  }

  getAppointments() {
    console.log('Getting appointments');
    this.appointmentsService.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        console.log('Appointments fetched:', appointments);
        this.appointments = appointments;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  generateCalendar() {
    console.log('Generating calendar');
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
    console.log('Calendar generated:', this.weeks);
  }

  previousMonth() {
    console.log('Navigating to previous month');
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    console.log('Navigating to next month');
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  selectDate(date: Date) {
    console.log('Selecting date:', date);
    this.selectedDate = new Date(date);
    console.log('Selected date:', this.selectedDate); // Asegúrate de que el valor se actualiza.
  }


  getAppointmentsForDate(date: Date): Appointment[] {
    console.log('Getting appointments for date:', date);
    const filteredAppointments = this.appointments.filter(appointment =>
      this.isSameDay(new Date(appointment.date), date)
    );
    console.log('Filtered appointments:', filteredAppointments);  // Verifica los resultados filtrados.
    return filteredAppointments;
  }


  hasAppointments(date: Date): boolean {
    const hasAppointments = this.getAppointmentsForDate(date).length > 0;
    console.log('Has appointments on', date, ':', hasAppointments);
    return hasAppointments;
  }


  isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  isSelectedMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
