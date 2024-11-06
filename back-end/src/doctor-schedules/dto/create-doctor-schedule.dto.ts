import { IsNumber, IsString, IsBoolean, Min, Max, IsTimeZone} from 'class-validator';

export class CreateDoctorScheduleDto {
    @IsString()
    doctorId: string;

    @IsNumber()
    @Min(0)
    @Max(6)
    dayOfWeek: number;

    @IsTimeZone()
    startTime: string;
    
    @IsTimeZone()
    endTime: string;

    @IsBoolean()
    isAvailable: boolean = true;
}