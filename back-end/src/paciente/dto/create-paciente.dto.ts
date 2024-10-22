
export class CreatePacienteDto {

    nombre: string;
    

    apellido: string;


    fecha_nacimiento: Date;

    celular: string;

    email: string;

    password: string;

    fecha_de_registro?: Date;

    deletedAt?: Date;
}
