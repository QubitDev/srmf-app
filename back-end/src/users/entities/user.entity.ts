
import { Doctors } from '../../doctor/entities/doctor.entity';
import { Patients } from '../../patient/entities/patient.entity';
import { UserRole } from 'src/common/enums';
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
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @Column({nullable: false, select:false})
    password: string;


    @OneToOne(() => Patients, (patient) => patient.user, {
        cascade: true,
        nullable: true
    })
    patient: Patients;

    @OneToOne(() => Doctors, doctor => doctor.user, {
        cascade: true,
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


