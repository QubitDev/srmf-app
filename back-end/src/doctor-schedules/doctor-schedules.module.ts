import { forwardRef, Module } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { DoctorSchedulesController } from './doctor-schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedule } from './entities/doctor-schedule.entity';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({ imports: [
    TypeOrmModule.forFeature([DoctorSchedule]),
    forwardRef(() => DoctorModule)
  ],
  controllers: [DoctorSchedulesController],
  providers: [DoctorSchedulesService],
  exports: [DoctorSchedulesService],
})
export class DoctorSchedulesModule {}
