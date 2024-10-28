import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Paciente {
    @PrimaryGeneratedColumn()
    id_paciente: number;
    
    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 100 })
    apellido: string;

    @Column('date')
    fecha_nacimiento: Date;

    @Column({ length: 20, nullable: false })
    celular: string;

    @OneToOne(() => User, user => user.paciente, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;
}
