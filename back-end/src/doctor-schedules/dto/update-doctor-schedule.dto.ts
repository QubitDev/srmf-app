import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorScheduleDto } from './create-doctor-schedule.dto';
import { IsBoolean, IsNumber, IsString, IsTimeZone, Max, Min } from 'class-validator';

export class UpdateDoctorScheduleDto extends PartialType(CreateDoctorScheduleDto) {
   

    


}
