import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PatientModule } from 'src/patient/patient.module';
import { Appointment } from './entities/appointment.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedulesModule } from '../doctor-schedules/doctor-schedules.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PatientModule,
    DoctorModule,
    DoctorSchedulesModule,
    SpecialtiesModule
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
