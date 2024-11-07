
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm';
import { Doctors } from '../../doctor/entities/doctor.entity';


@Entity()
export class Specialty {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Doctors, doctor => doctor.specialty)
    doctors: Doctors[];

    @Column({unique:true})
    name:string

    @Column()
    description: string;

    @DeleteDateColumn()
    deletedAt: Date;
}