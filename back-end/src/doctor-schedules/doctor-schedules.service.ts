import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { DoctorSchedule } from './entities/doctor-schedule.entity';

@Injectable()
export class DoctorSchedulesService {
  constructor(
    @InjectRepository(DoctorSchedule)
    private readonly scheduleRepository: Repository<DoctorSchedule>
  ){}

  async create(createDoctorScheduleDto: CreateDoctorScheduleDto) {
    const existingSchedule = await this.scheduleRepository.findOne({
      where: {
        doctorId: createDoctorScheduleDto.doctorId,
        dayOfWeek: createDoctorScheduleDto.dayOfWeek,
      }
    });

    if (existingSchedule) {
      throw new BadRequestException('Schedule already exists for this day');
    }

    return await this.scheduleRepository.save(createDoctorScheduleDto);
  }

  async findDoctorSchedules(doctorId: string) {
    return await this.scheduleRepository.find({
      where: { 
        doctorId,
        isAvailable: true 
      },
      order: {
        dayOfWeek: 'ASC',
        startTime: 'ASC'
      }
    });
  }

  async checkAvailability(doctorId: string, date: Date, time: string) {
    const dayOfWeek = date.getDay();
    
    const schedule = await this.scheduleRepository.findOne({
      where: {
        doctorId,
        dayOfWeek,
        isAvailable: true
      }
    });

    if (!schedule) {
      return false;
    }
    return this.isTimeWithinSchedule(time, schedule.startTime, schedule.endTime);
  }

  private isTimeWithinSchedule(time: string, startTime: string, endTime: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    const [startHours, startM] = startTime.split(':').map(Number);
    const [endHours, endM] = endTime.split(':').map(Number);

    const timeMinutes = hours * 60 + minutes;
    const startMinutes = startHours * 60 + startM;
    const endMinutes = endHours * 60 + endM;

    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
  }
}