import { Appointment } from 'src/appointments/entities/appointment.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Patients {
    @PrimaryGeneratedColumn()
    patient_id: number;
    
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Appointment, appointment => appointment.patient)
    appointments: Appointment[];

    @CreateDateColumn()
    createdAt: Date; 

    @UpdateDateColumn()
    updatedAt: Date; 
    
    @DeleteDateColumn()
    deletedAt: Date; 
}
