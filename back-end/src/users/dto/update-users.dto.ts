import { IsOptional, IsString, IsEnum, IsEmail, Length } from 'class-validator';
import { UserRole } from 'src/common/enums';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    lastName?: string;

    @IsOptional()
    @IsString()
    @Length(10, 20)
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;
}