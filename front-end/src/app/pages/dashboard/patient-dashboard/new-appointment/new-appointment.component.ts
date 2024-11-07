// src/app/pages/dashboard/patient-dashboard/new-appointment/new-appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../../core/services/new-appointment.service';
import { AppointmentRequest, AppointmentResponse } from '../../../../core/interfaces/appointment.interface';
import {Doctor} from '../../../../core/interfaces/doctor.interface';
import {Specialty} from '../../../../core/interfaces/specialty.interface';


interface AppointmentFormControls {
  specialtyId: FormControl<string | null>;
  doctorId: FormControl<string | null>;
  appointmentDate: FormControl<string | null>;
  appointmentTime: FormControl<string | null>;
  reason: FormControl<string | null>;
}

interface AppointmentFormControls {
  specialtyId: FormControl<string | null>;
  doctorId: FormControl<string | null>;
  appointmentDate: FormControl<string | null>;
  appointmentTime: FormControl<string | null>;
  reason: FormControl<string | null>;
}

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup<AppointmentFormControls>;
  specialties: Specialty[] = [];
  doctors: Doctor[] = [];
  availableTimeSlots: string[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSpecialties();
  }

  private initForm(): void {
    this.appointmentForm = this.fb.group<AppointmentFormControls>({
      specialtyId: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      doctorId: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      appointmentDate: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      appointmentTime: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      reason: this.fb.control('', { validators: [Validators.required, Validators.minLength(10)], nonNullable: true })
    });

    this.setupFormSubscriptions();
  }

  private setupFormSubscriptions(): void {
    this.appointmentForm.get('specialtyId')?.valueChanges.subscribe(specialtyId => {
      if (specialtyId) {
        // Opción 1: Usar ID
       // this.loadDoctors(specialtyId);

        // Opción 2: Usar nombre
         const selectedSpecialty = this.specialties.find(s => s.id === specialtyId);
         if (selectedSpecialty) {
           this.loadDoctorsBySpecialtyName(selectedSpecialty);
        }

        this.appointmentForm.patchValue({
          doctorId: '',
          appointmentTime: ''
        });
      } else {
        this.doctors = [];
      }
    });
    this.appointmentForm.get('doctorId')?.valueChanges.subscribe(() => {
      this.checkAndLoadTimeSlots();
    });

    this.appointmentForm.get('appointmentDate')?.valueChanges.subscribe(() => {
      this.checkAndLoadTimeSlots();
    });
  }

  private loadSpecialties(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.appointmentService.getSpecialties().subscribe({
      next: (specialties) => {
        this.specialties = specialties;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar especialidades:', error);
        this.errorMessage = 'No se pudieron cargar las especialidades';
        this.isLoading = false;
      }
    });
  }

 // Opción 1: Cargar doctores por ID de especialidad
 private loadDoctors(specialtyId: string): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.appointmentService.getDoctorsBySpecialty(specialtyId).subscribe({
    next: (doctors) => {
      this.doctors = doctors;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error al cargar doctores:', error);
      this.errorMessage = 'No se pudieron cargar los doctores';
      this.isLoading = false;
    }
  });
}

// Opción 2: Cargar doctores por nombre de especialidad
private loadDoctorsBySpecialtyName(specialty: Specialty): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.appointmentService.getDoctorsBySpecialtyName(specialty.name).subscribe({
    next: (doctors) => {
      this.doctors = doctors;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error al cargar doctores:', error);
      this.errorMessage = 'No se pudieron cargar los doctores';
      this.isLoading = false;
    }
  });
}

  private checkAndLoadTimeSlots(): void {
    const doctorId = this.appointmentForm.get('doctorId')?.value;
    const date = this.appointmentForm.get('appointmentDate')?.value;

    if (doctorId && date) {
      this.loadAvailableTimeSlots(doctorId, date);
    } else {
      this.availableTimeSlots = [];
      this.appointmentForm.get('appointmentTime')?.setValue('');
    }
  }

  private loadAvailableTimeSlots(doctorId: string, date: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    const formattedDate = new Date(date).toISOString().split('T')[0];

    this.appointmentService.getAvailableTimeSlots(doctorId, formattedDate).subscribe({
      next: (response) => {
        this.availableTimeSlots = response.availableTimeSlots;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar horarios disponibles:', error);
        this.errorMessage = 'No se pudieron cargar los horarios disponibles';
        this.isLoading = false;
      }
    });
  }

  getDoctorFullName(doctor: Doctor): string {
    return `${doctor.user.name} ${doctor.user.lastName}`;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formValue = this.appointmentForm.value;

      const appointmentRequest: AppointmentRequest = {
        doctorId: formValue.doctorId ?? '',
        appointmentDate: new Date(formValue.appointmentDate ?? ''),
        appointmentTime: formValue.appointmentTime ?? '',
        reason: formValue.reason ?? ''
      };

      this.appointmentService.createAppointment(appointmentRequest).subscribe({
        next: (response: AppointmentResponse) => {
          this.successMessage = 'La cita se ha agendado correctamente';
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/dashboard/appointments']);
          }, 1500);
        },
        error: (error) => {
          console.error('Error al crear la cita:', error);
          this.errorMessage = error.error?.message || 'No se pudo agendar la cita';
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.appointmentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get formControls() {
    return this.appointmentForm.controls;
  }

  resetForm(): void {
    this.appointmentForm.reset();
    this.doctors = [];
    this.availableTimeSlots = [];
    this.errorMessage = '';
    this.successMessage = '';
  }
}
