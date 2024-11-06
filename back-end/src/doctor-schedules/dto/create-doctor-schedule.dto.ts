import { Type } from 'class-transformer';
import { IsString, IsBoolean, Matches, IsDate} from 'class-validator';

export class CreateDoctorScheduleDto {
    @IsString()
    doctorId: string;

    @IsDate()
    @Type(() => Date)
    dayOfWeek: Date;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    startTime: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    endTime: string;

    @IsBoolean()
    isAvailable: boolean = true;
}