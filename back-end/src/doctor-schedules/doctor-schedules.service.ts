import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { forwardRef } from '@nestjs/common';

import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { DoctorSchedule } from './entities/doctor-schedule.entity';
import { DoctorService } from '../doctor/doctor.service';
import { Doctors } from 'src/doctor/entities/doctor.entity';
import { console } from 'inspector';

@Injectable()
export class DoctorSchedulesService {
  constructor(
    @InjectRepository(DoctorSchedule)
    private readonly scheduleRepository: Repository<DoctorSchedule>,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService, 
  ) { }

  async findOne(doctorId: string, dayOfWeek: Date, time:string): Promise<DoctorSchedule | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: {
        doctorId,
        dayOfWeek: dayOfWeek, 
        startTime: time,
        isAvailable: true, 
      },
    });
    
    console.log(schedule)
    if (!schedule) {
      return null; 
    }

    return schedule;
  }
  
  async generateSchedulesForNextThreeMonths() {
    const doctors = await this.doctorService.findAll();

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 3); 

    for (const doctor of doctors) {
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
          await this.generateDoctorDaySchedule(doctor, currentDate);
        }
        currentDate.setDate(currentDate.getDate() + 1); 
      }
    }
  }

  private async generateDoctorDaySchedule(doctor: Doctors, currentDate: Date) {
    const localDate = new Date(currentDate);
    localDate.setHours(0, 0, 0, 0);
    const existingSchedules = await this.scheduleRepository.find({
      where: {
        doctorId: doctor.id,
        dayOfWeek: localDate,
      },
    });
  
    if (existingSchedules.length > 0) {
      return;
    }
  
    const hours = [
      { start: '08:00:00', end: '12:00:00' }, 
      { start: '14:00:00', end: '18:00:00' },  
    ];
  
    const schedulesToSave: DoctorSchedule[] = [];
  
    hours.forEach((hour) => {
      let currentStartTime = this.convertStringToDate(currentDate, hour.start);
      const currentEndTime = this.convertStringToDate(currentDate, hour.end);
  
      while (currentStartTime < currentEndTime) {
        const schedule = new DoctorSchedule();
        schedule.doctorId = doctor.id;
        schedule.dayOfWeek = currentDate;
        schedule.startTime = this.convertDateToTimeString(currentStartTime);
        currentStartTime.setMinutes(currentStartTime.getMinutes() + 30); 
        schedule.endTime = this.convertDateToTimeString(currentStartTime);
        schedule.isAvailable = true;
  
        schedulesToSave.push(schedule);
      }
    });
  
    if (schedulesToSave.length > 0) {
      await this.scheduleRepository.save(schedulesToSave);
    }
  }
  
  async updateAvailability(
    doctorId: string,
    date: Date,
    time: string,
    isAvailable: boolean
  ): Promise<void> {

    const result = await this.scheduleRepository.update(
      {
        doctorId,
        dayOfWeek: date,
        startTime: time
      }, 
      { isAvailable } 
    );
  
    if (result.affected === 0) {
      throw new NotFoundException('Schedule not found for the doctor on this date');
    }
  }


private convertStringToDate(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}


private convertDateToTimeString(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = '00';
  return `${hours}:${minutes}:${seconds}`;
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


  async checkAvailability(doctorId: string, appointmentDate: Date, appointmentTime: string) {
    const startDate = new Date(appointmentDate); startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(appointmentDate); endDate.setHours(23, 59, 59, 999);
    const schedule = await this.scheduleRepository.findOne({
      where: {
        doctorId,
        dayOfWeek: Between(startDate, endDate), 
        isAvailable: true,
      },
    });
  
    if (!schedule) {
      return false;
    }
  
    return this.isTimeWithinSchedule(appointmentTime, schedule.startTime, schedule.endTime);
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


  async findSchedulesByDoctorAndDate(doctorId: string, date: Date): Promise<DoctorSchedule[]> {
    const startDate = new Date(date); startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date); endDate.setHours(23, 59, 59, 999);

    console.log('Doctor ID:', doctorId);
    console.log('Formatted Date:', date);

    const repo = await this.scheduleRepository.find({
      where: {
        doctorId,
        dayOfWeek: Between(startDate, endDate),
        isAvailable: true
      },
    });


    console.log('hola daniel gay')
    return repo
  }
}