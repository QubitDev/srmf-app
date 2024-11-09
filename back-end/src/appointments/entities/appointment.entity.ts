// src/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctors } from '../../doctor/entities/doctor.entity';
import { Patients } from '../../patient/entities/patient.entity';
import { AppointmentStatus } from '../../common/enums/appointment-status.enum';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'appointment_date' })
    appointmentDate: Date;

    @Column()
    appointmentTime: string;
    
    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.PENDING,
    })
    status: AppointmentStatus;
    
    @Column({ type: 'text', nullable: true })
    reason: string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @ManyToOne(() => Patients, patient => patient.appointments, {
        eager: true,
        nullable: false,  
        onDelete: 'CASCADE' 
    })
    @JoinColumn({ name: 'patient_id' })
    patient: Patients;

    @Column()
    patient_id: string;
    
    @ManyToOne(() => Doctors, doctor => doctor.appointments, {
        eager: true,
        nullable: false, 
        onDelete: 'CASCADE'  
    })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctors;

    @Column()
    doctor_id:string;
}
