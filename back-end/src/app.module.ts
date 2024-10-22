import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { PacienteModule } from './paciente/paciente.module';
import { CitaModule } from './cita/cita.module';
import { AuthModule } from './auth/auth.module';

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
  }), DoctorModule, PacienteModule, CitaModule, AuthModule],
})
export class AppModule {}
