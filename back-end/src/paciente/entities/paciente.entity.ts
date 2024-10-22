import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

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

    @Column('text', { nullable: false, unique: true })
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_de_registro: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
