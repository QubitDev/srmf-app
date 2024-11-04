import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/user.entity';
import { DoctorModule } from '../doctor/doctor.module';
import { SpecialtiesModule } from '../specialties/specialties.module';

@Module({
  imports: [
    DoctorModule,
    SpecialtiesModule,
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
