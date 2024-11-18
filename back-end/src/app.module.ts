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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DATABASE,
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
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
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
