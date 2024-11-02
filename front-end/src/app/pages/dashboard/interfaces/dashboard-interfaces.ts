// src/app/pages/dashboard/interfaces/dashboard-interfaces.ts
export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
}
