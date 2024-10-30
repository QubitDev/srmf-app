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
    name: string;

    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    phone: string; 

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    document: string;

    @IsEmail()
    email: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}