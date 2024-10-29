import { Doctors } from 'src/doctor/entities/doctor.entity';
import { Patients } from 'src/patient/entities/patient.entity';
import { UserRole } from 'src/shared/enums';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 20, nullable: false })
    phone: string;

    @Column()
    document: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT
    })
    role: UserRole;


    @Column({ unique: true , nullable: false })
    email: string;

    @Column({nullable: false})
    password: string;


    @OneToOne(() => Patients, paciente => paciente.user, {
        nullable: true
    })
    paciente: Patients;

    @OneToOne(() => Doctors, doctor => doctor.user, {
        nullable: true
    })
    doctor: Doctors; 

    @CreateDateColumn()
    createdAt: Date; 

    @UpdateDateColumn()
    updatedAt: Date; 

    @DeleteDateColumn()
    deletedAt: Date; 
}


