import { IsString, IsUUID, IsDateString, Matches, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
    @IsUUID()
    doctorId: string;

    @IsDateString()
    appointmentDate: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    appointmentTime: string;

    @IsString()
    @IsOptional()
    reason?: string;
}