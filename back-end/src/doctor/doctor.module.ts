import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [Doctor]
})
export class DoctorModule {}
