import { Doctors } from "src/doctor/entities/doctor.entity";
import { Patients } from "src/patient/entities/patient.entity";
import { UserRole } from "src/shared/enums";

export class CreateUserDto {

    name: string;

    lastName: string;

    phone: string;

    document: string;

    role: UserRole;

    email: string;

    password: string;

    createdAt: Date;
}
