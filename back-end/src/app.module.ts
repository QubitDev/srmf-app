import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DoctorSchedulesModule } from './doctor-schedules/doctor-schedules.module';
import { User } from './users/entities/user.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Specialty } from './specialties/entities/specialty.entity';
import { Patients } from './patient/entities/patient.entity';
import { Doctors } from './doctor/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'encinas',
    password: 'jhona',
    database: 'srfm_db',
    entities: [
      User,
      Doctors,
      Patients, 
      Specialty,
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
