import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';

@Controller('doctor-schedules')
export class DoctorSchedulesController {
  constructor(private readonly doctorSchedulesService: DoctorSchedulesService) {}

  @Get(':doctorId')
  findDoctorSchedules(@Param('doctorId') doctorId: string) {
    return this.doctorSchedulesService.findDoctorSchedules(doctorId);
  }

  @Post('generate-schedules')
  async generateSchedules() {
    await this.doctorSchedulesService.generateSchedulesForNextThreeMonths();  
    return { message: 'Schedules generated for the next three months' };
  }
}
