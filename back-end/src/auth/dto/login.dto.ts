import { Transform, Type } from "class-transformer";
import {     
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}