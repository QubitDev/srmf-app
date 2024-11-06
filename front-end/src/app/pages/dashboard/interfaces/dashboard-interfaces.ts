// src/app/pages/dashboard/interfaces/dashboard-interfaces.ts
export interface Appointment {
  id: string;
  date: String;
  time: string;
  doctorName: string;
  specialty: string;
  consultingRoom: string;
  description: string;  // Agregamos este campo
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
