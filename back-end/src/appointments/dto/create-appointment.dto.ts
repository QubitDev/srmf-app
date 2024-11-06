import { IsString, IsUUID, IsDateString, Matches, IsOptional, IsDate } from 'class-validator';

export class CreateAppointmentDto {
    @IsUUID()
    doctorId: string;

    @IsDate()
    appointmentDate: Date;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    appointmentTime: string;

    @IsString()
    @IsOptional()
    reason: string;
}