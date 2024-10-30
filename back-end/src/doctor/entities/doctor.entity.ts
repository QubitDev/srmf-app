import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';
import { DoctorSchedule } from '../../doctor-schedules/entities/doctor-schedule.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity({ name: 'doctors' })
export class Doctors {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'license_number' })
    licenseNumber: string;
    
    @Column({ name: 'consulting_room' })
    consultingRoom: string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @ManyToOne(() => Specialty)
    @JoinColumn({ name: 'specialty_id' })
    specialty: Specialty;

    @OneToMany(() => DoctorSchedule, (schedule) => schedule.doctor, {
        cascade: true
    })
    schedules: DoctorSchedule[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
}