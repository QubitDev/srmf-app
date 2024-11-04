import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Patients {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @OneToOne(() => Users, (user) => user.patient, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id', referencedColumnName:'id'})
    user: Users;

    @OneToMany(() => Appointment, appointment => appointment.patient, {
        cascade: true
    })
    appointments: Appointment[];

    @CreateDateColumn()
    createdAt: Date; 

    @UpdateDateColumn()
    updatedAt: Date; 
    
    @DeleteDateColumn()
    deletedAt: Date; 

}
