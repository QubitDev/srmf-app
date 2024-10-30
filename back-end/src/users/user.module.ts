import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
/*import { PatientModule } from 'src/patient/patient.module'; */

@Module({
  imports: [
    DoctorModule,
    SpecialtiesModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
