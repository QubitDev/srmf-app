import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { AppointmentStatus } from "../../common/enums";

export class AppointmentFilters {
    @IsOptional()
    @IsDateString()
    date?: Date;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;
}