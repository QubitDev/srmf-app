// src/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctors } from '../../doctor/entities/doctor.entity';
import { Patients } from '../../patient/entities/patient.entity';
import { AppointmentStatus } from 'src/shared/enums/appointment-status.enum';




@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'appointment_date' })
    appointmentDate: Date;
    
    @Column({
        type: 'enum',
        enum: AppointmentStatus,
    })
    status: AppointmentStatus;
    
    @Column()
    reason: string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @ManyToOne(() => Patients, patient => patient.appointments)
    @JoinColumn({ name: 'patient_id' })
    patient: Patients;
    
    @ManyToOne(() => Doctors, doctor => doctor.appointments)
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctors;
}
