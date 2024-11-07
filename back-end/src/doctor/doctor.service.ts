import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctors } from './entities/doctor.entity';
import { SpecialtiesService } from '../specialties/specialties.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctors)
    private readonly doctorRepository: Repository<Doctors>,
    private readonly specialtiesService: SpecialtiesService,
  ) { }
  
  createDoctor(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepository.save(createDoctorDto);
  }

  async findAll() {
    return await this.doctorRepository.find({
      relations: ['user', 'specialty', 'schedules', 'appointments']
    });
  }

  async findOne(id: string) {
    return await this.doctorRepository.findOne({
      where: { id },
      relations: ['user', 'specialty', 'schedules', 'appointments']
    });
  }


  async getDoctorsBySpecialty(specialtyId: string): Promise<Doctors[]> {
    return await this.doctorRepository.find({
      where: { 
        specialty: { id: specialtyId } 
      },
      relations: {
        user: true,
        schedules: true
      }
    });
  }

  async getDoctorsBySpecialtyName(specialtyName: string): Promise<Doctors[]> {
    const specialty = await this.specialtiesService.findByName(specialtyName);

    return specialty.doctors;
  }

  async getDoctorSchedule(doctorId: string, dayOfWeek : Date, time:string){
    const doctor = await this.doctorRepository
      .createQueryBuilder('doctor')
      .innerJoinAndSelect('doctor.schedules', 'schedule')
      .where('doctor.id = :doctorId', { doctorId })
      .getOne()
    
    if (!doctor) {
      throw new NotFoundException('Doctor not found .........25');
    }

    // Convert `dayOfWeek` to 'YYYY-MM-DD' string
    const dayOfWeekStr = dayOfWeek.toISOString().split('T')[0];
  
    // Find the schedule with the matching date
    const schedule = doctor.schedules.find(s => 
      s.dayOfWeek instanceof Date ? s.dayOfWeek.toISOString().split('T')[0] === dayOfWeekStr : s.dayOfWeek === dayOfWeekStr
    );
    console.log(schedule)

    if (!schedule) {
      throw new NotFoundException('No schedule available for this day');
    }

    return this.generateTimeSlots(schedule.startTime, schedule.endTime);
  }
  
  private generateTimeSlots(startTime: string, endTime: string): string[] {
    const slots: string[] = [];
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const interval = 30;

    while (start < end) {
      slots.push(start.toTimeString().slice(0, 5));
      start.setMinutes(start.getMinutes() + interval);
    }

    return slots;
  }
}
