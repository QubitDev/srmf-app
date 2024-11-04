import { Specialty } from "src/specialties/entities/specialty.entity";
import { Users } from "../../users/entities/user.entity";

export class CreateDoctorDto {

    user: Users;

    specialty: Specialty;

    licenseNumber: string;

    consultingRoom: string;
    
    createdAt: Date; 
}
