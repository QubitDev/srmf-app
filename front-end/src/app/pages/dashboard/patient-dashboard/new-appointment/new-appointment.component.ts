import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css'
})
export class NewAppointmentComponent {
  appointmentForm: FormGroup;
  specialties = [
    'Cardiología',
    'Dermatología',
    'Medicina General',
    'Pediatría',
    'Odontología'
  ];

  availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:30', '14:00', '14:30', '15:00', '15:30'
  ];

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      specialty: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      // Aquí iría la lógica para crear la cita
    }
  }
}
