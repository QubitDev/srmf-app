import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { PacienteModule } from './paciente/paciente.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'encinas',
    password: 'jhona',
    database: 'srfm_db',
    autoLoadEntities:true,
    synchronize: true,
  }), DoctorModule, PacienteModule, AuthModule, UsersModule, CitasModule],
})
export class AppModule {}
