import { IsDateString, IsUUID } from "class-validator";

export class AvailableSlotsQueryDto {
    @IsUUID()
    doctorId: string;

    @IsDateString()
    date: string;
}