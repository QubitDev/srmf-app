import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    OneToOne
} from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true , nullable: false })
    email: string;

    @Column({nullable: false})
    password: string;

    /* @Column({
        type: 'enum',
        enum: Role,
        default: Role.PATIENT
    })
    role: Role;*/

    @OneToOne(() => Paciente, paciente => paciente.user, {
        nullable: true
    })
    paciente: Paciente;

    @OneToOne(() => Doctor, doctor => doctor.user, {
        nullable: true
    })
    doctor: Doctor; 

    @DeleteDateColumn()
    deletedAt: Date; 
}


