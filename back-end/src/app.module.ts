import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  })],
})
export class AppModule {}
