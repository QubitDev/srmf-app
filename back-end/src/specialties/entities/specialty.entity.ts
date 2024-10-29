
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Doctors } from '../../doctor/entities/doctor.entity';


@Entity()
export class Specialty {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Doctors, doctor => doctor.specialty)
    doctors: Doctors[];

    @Column({unique:true})
    name:string

    @Column()
    description: string;

}