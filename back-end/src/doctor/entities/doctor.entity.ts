import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    especialidad: string;

    @Column()
    telefono: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => User, user => user.doctor, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;
}