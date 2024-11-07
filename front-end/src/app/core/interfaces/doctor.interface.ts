// src/app/core/interfaces/doctor.interface.ts
export interface Doctor {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialty: {
    id: string;
    name: string;
  };
  licenseNumber: string;
  consultingRoom: string;
}
