import {     
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
    MinLength
} from "class-validator";
import { Transform, Type } from "class-transformer";

import { Doctors } from "src/doctor/entities/doctor.entity";
import { Patients } from "src/patient/entities/patient.entity";
import { UserRole } from "src/shared/enums";

export class RegisterDoctorDto {
    
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
    
    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    document: string;
    
    @IsEmail()
    email: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    specialty: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    licenseNumber: string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @IsNotEmpty()
    @Length(2,4)
    consultingRoom: string;
}
