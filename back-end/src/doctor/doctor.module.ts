import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedulesModule } from '../doctor-schedules/doctor-schedules.module';

import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctors } from './entities/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctors]),
    forwardRef(() => DoctorSchedulesModule)
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService]
})
export class DoctorModule {}
