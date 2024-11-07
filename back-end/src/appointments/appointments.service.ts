import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';


import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { DoctorSchedulesService } from '../doctor-schedules/doctor-schedules.service';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { AppointmentStatus } from '../common/enums';
import { scheduled } from 'rxjs';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly doctorScheduleService: DoctorSchedulesService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) { }

  async getAvailableTimeSlots(
    doctorId: string,
    date: Date
  ): Promise<{ startTime: string, endTime: string }[]> {
    
    console.log(date)
    const formattedDate = date.toISOString().split('T')[0];

    const availableSchedules = await this.doctorScheduleService.findSchedulesByDoctorAndDate(
      doctorId, 
      date
    );
    

    console.log(availableSchedules)



    if (!availableSchedules.length) {
      throw new NotFoundException('No available schedules for this day----1');
    }

    return availableSchedules
      .filter(scheduled => scheduled.isAvailable === true)
      .map(schedule => ({
      startTime: schedule.startTime.slice(0, 5), 
      endTime: schedule.endTime.slice(0, 5),     
    }));
  }

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    userEmail: string
  ): Promise<Appointment> {

    const patient = await this.patientService.findByUserEmail(userEmail);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  
    const availableSlots = await this.getAvailableTimeSlots(
      createAppointmentDto.doctorId,
      createAppointmentDto.appointmentDate,
    );


    console.log(availableSlots)

  

    const isTimeSlotAvailable = availableSlots.some(slot => {
      const [startHour, startMinute] = slot.startTime.split(':').map(Number);
      const [endHour, endMinute] = slot.endTime.split(':').map(Number);
      const [appointmentHour, appointmentMinute] = createAppointmentDto.appointmentTime.split(':').map(Number);
  
      const isAfterStart = appointmentHour > startHour || (appointmentHour === startHour && appointmentMinute >= startMinute);
      const isBeforeEnd = appointmentHour < endHour || (appointmentHour === endHour && appointmentMinute <= endMinute);
  
      return isAfterStart && isBeforeEnd;
    });
  
    if (!isTimeSlotAvailable) {
      throw new ConflictException('Selected time slot is not available');
    }
  
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      patient,
      doctor: { id: createAppointmentDto.doctorId },
      status: AppointmentStatus.PENDING
    });

    const appointmentSave = await this.appointmentRepository.save(appointment);

    await this.doctorScheduleService.updateAvailability(
      createAppointmentDto.doctorId,
      createAppointmentDto.appointmentDate,
      createAppointmentDto.appointmentTime,
      false
    );
  
    return appointmentSave ;
  }

  async findAll() {
    return await this.appointmentRepository.find({
      relations: ['doctor', 'doctor.user', 'patient', 'patient.user'],
      order: {
        appointmentDate: 'DESC'
      }
    });
  }

  async findByPatient(patientId: string) {
    return await this.appointmentRepository.find({
      where: {
        patient: { id: patientId }
      },
      relations: ['doctor', 'doctor.user', 'doctor.specialty'],
      order: {
        appointmentDate: 'DESC'
      }
    });
  }

  async findByDoctor(doctorId: string) {
    return await this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId }
      },
      relations: ['patient', 'patient.user'],
      order: {
        appointmentDate: 'DESC'
      } 
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor', 'doctor.user', 'doctor.specialty', 'patient', 'patient.user']
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }


  async findByDatePatient(date: Date) {
    const appointments = await this.appointmentRepository.find({
      where: { appointmentDate: date },
      relations: ['doctor', 'doctor.user', 'doctor.specialty', 'patient', 'patient.user']
    });

    return appointments.map(appointment => ({
      id: appointment.id,
      date: appointment.appointmentDate.toISOString().split('T')[0],
      time: appointment.appointmentTime,
      doctorName: `Dr. ${appointment.doctor.user.name} ${appointment.doctor.user.lastName}`,
      specialty: appointment.doctor.specialty.name,
      consultingRoom: appointment.doctor.consultingRoom || 'N/A',
      status: appointment.status,
    }));
  }


  async findByDateDoctor(date: Date) {
    const appointments = await this.appointmentRepository.find({
      where: { appointmentDate: date },
      relations: ['doctor', 'doctor.user', 'doctor.specialty', 'patient', 'patient.user']
    });

    return appointments.map(appointment => ({
      id: appointment.id,
      date: appointment.appointmentDate.toISOString().split('T')[0],
      time: appointment.appointmentTime,
      PatientName: `Dr. ${appointment.patient.user.name} ${appointment.patient.user.lastName}`,
      consultingRoom: appointment.doctor.consultingRoom || 'N/A',
      status: appointment.status,
    }));
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    if (updateAppointmentDto.status === AppointmentStatus.CANCELLED) {
      //TODO:LOGICA PARA ACTUALIZAR DATOS DE EL ESTADO
    }

    return await this.appointmentRepository.save({
      ...appointment,
      ...updateAppointmentDto
    });
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    return await this.appointmentRepository.softRemove(appointment);
  }

  async checkAvailability(doctorId: string, date: Date, time: string): Promise<boolean> {
    const existingSchedule = await this.doctorScheduleService.findOne(doctorId, date, time);
  
    if (!existingSchedule) {
      return false;
    }
  
    return this.isTimeWithinSchedule(time, existingSchedule.startTime, existingSchedule.endTime);
  }

  private isTimeWithinSchedule(time: string, startTime: string, endTime: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
  
    const timeMinutes = hours * 60 + minutes;
    const startMinutesTotal = startHours * 60 + startMinutes;
    const endMinutesTotal = endHours * 60 + endMinutes;
  
    return timeMinutes >= startMinutesTotal && timeMinutes <= endMinutesTotal;
  }
}
