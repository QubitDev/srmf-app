import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor-schedule.dto';

@Controller('doctor-schedules')
export class DoctorSchedulesController {
  constructor(private readonly doctorSchedulesService: DoctorSchedulesService) {}

  @Post()
  create(@Body() createDoctorScheduleDto: CreateDoctorScheduleDto) {
    return this.doctorSchedulesService.create(createDoctorScheduleDto);
  }

}
