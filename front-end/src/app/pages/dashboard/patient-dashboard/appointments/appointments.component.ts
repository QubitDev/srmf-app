import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Appointment {
  id: string;
  date: Date;
  time: string;
  doctorName: string;
  specialty: string;
  consultingRoom: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
}

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

  // Datos de ejemplo
  appointments: Appointment[] = [
    {
      id: '1',
      date: new Date(),
      time: '10:00',
      doctorName: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      consultingRoom: 'Consultorio 101',
      description: 'Control mensual cardíaco',
      status: 'pending'
    },
    {
      id: '2',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: '15:30',
      doctorName: 'Dra. María González',
      specialty: 'Medicina General',
      consultingRoom: 'Consultorio 203',
      description: 'Chequeo general',
      status: 'pending'
    }
  ];

  ngOnInit() {
    this.generateCalendar();
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
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    return this.appointments.filter(appointment =>
      this.isSameDay(new Date(appointment.date), date)
    );
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

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
