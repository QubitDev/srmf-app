// src/app/pages/dashboard/interfaces/dashboard-interfaces.ts
export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  consultingRoom: string;
  description: string;
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
