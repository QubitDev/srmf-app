import { IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreatePacienteDto {

    nombre: string;
    
    apellido: string;

    fecha_nacimiento: Date;

    celular: string;

    @IsOptional()
    user?: User;
}
