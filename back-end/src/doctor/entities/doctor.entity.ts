import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
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
    
    @OneToOne(() => Users, (user) => user.doctor, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id', referencedColumnName:'id' })
    user: Users;
    
    @ManyToOne(() => Specialty, (specialty) => specialty.id, {
        eager:true,
    })
        
    @JoinColumn({ name: 'specialty_id', referencedColumnName:'id'  })
    specialty: Specialty;

    @OneToMany(() => DoctorSchedule, (schedule) => schedule.doctor, {
        cascade: true,
    })
    schedules: DoctorSchedule[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
        cascade: true
    })
    appointments: Appointment[];

}