import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DoctorSchedulesModule } from './doctor-schedules/doctor-schedules.module';
import { Users } from './users/entities/user.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Specialty } from './specialties/entities/specialty.entity';
import { Patients } from './patient/entities/patient.entity';
import { Doctors } from './doctor/entities/doctor.entity';
import { DoctorSchedule } from './doctor-schedules/entities/doctor-schedule.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'srfm_db',
    entities: [
      Users,
      Doctors,
      Patients, 
      Specialty,
      DoctorSchedule,
      Appointment,
      DoctorModule
    ],
    autoLoadEntities:true,
    synchronize: true,
    logging: true,
  }),
    DoctorModule, 
    PatientModule,
    AuthModule,
    UsersModule,
    SpecialtiesModule, 
    AppointmentsModule,
    DoctorSchedulesModule],
})
export class AppModule {}
