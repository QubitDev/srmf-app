import { IsDate, IsEnum, IsOptional } from "class-validator";
import { AppointmentStatus } from "../../common/enums";
import { Type } from "class-transformer";

export class AppointmentFilters {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;
}