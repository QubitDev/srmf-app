import { IsOptional } from "class-validator";
import { Users } from "src/users/entities/user.entity";

export class CreatePatientDto {
    user: Users;
    createdAt: Date; 
}
