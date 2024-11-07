import { Type } from "class-transformer";
import { IsDate, IsDateString, IsUUID } from "class-validator";

export class AvailableSlotsQueryDto {
    @IsUUID()
    doctorId: string;

    @IsDate()
    @Type(() => Date)
    date: Date;
}