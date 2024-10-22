import { Transform, Type } from "class-transformer";
import {     
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
} from "class-validator";

export class RegisterDto {
    
    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    apellido: string;

    @Type(() => Date) 
    @IsDate()
    fecha_nacimiento: Date;

    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    celular: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @Type(() => Date) 
    @IsDate()
    fecha_de_registro: Date;

    //@Type(() => Date) 
    //@IsDate()
    deletedAt?: Date;
}