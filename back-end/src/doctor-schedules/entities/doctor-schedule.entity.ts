import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Doctors } from '../../doctor/entities/doctor.entity';

@Entity({ name: 'doctor_schedules' })
export class DoctorSchedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'doctor_id' })
    doctorId: string;
    
    @Column({ name: 'day_of_week', type: 'date' })
    dayOfWeek: Date;
    
    @Column({ name: 'start_time', type: 'time' })
    startTime: string;
    
    @Column({ name: 'end_time', type: 'time' })
    endTime: string;
    
    @Column({ name: 'is_available', default: true })
    isAvailable: boolean;
    
    @ManyToOne(() => Doctors, (doctor) => doctor.id, {
        onDelete: 'CASCADE',
        eager:true,
    })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctors;
}