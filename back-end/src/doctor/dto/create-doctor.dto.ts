import { Specialty } from "src/specialties/entities/specialty.entity";
import { User } from "../../users/entities/user.entity";

export class CreateDoctorDto {

    user: User;

    specialty: Specialty;

    licenseNumber: string;

    consultingRoom: string;
    
    createdAt: Date; 
}
