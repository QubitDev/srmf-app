import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PatientModule } from 'src/patient/patient.module';
import { Appointment } from './entities/appointment.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PatientModule,
    DoctorModule,
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
