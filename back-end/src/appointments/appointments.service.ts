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
  ): Promise<string[]> {
    const appointmentDate = new Date(date);
    
    const formattedDate = appointmentDate.toISOString().split('T')[0];

    const allTimeSlots = await this.doctorService.getDoctorSchedule(
      doctorId,
      date
    );

    const existingAppointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.doctor_id = :doctorId', { doctorId })
      .andWhere('DATE(appointment.appointmentDate) = :date', { 
          date: formattedDate 
      })
      .andWhere('appointment.status != :status', { 
          status: AppointmentStatus.CANCELLED 
      })
      .getMany();

    const bookedSlots = existingAppointments.map(apt => apt.appointmentTime);
    return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
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
      createAppointmentDto.appointmentDate
    );

    if (!availableSlots.includes(createAppointmentDto.appointmentTime)) {
        throw new ConflictException('Selected time slot is not available');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      patient,
      doctor: { id: createAppointmentDto.doctorId },
      status: AppointmentStatus.PENDING
    });

    return await this.appointmentRepository.save(appointment);
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

  // Método para verificar disponibilidad
  async checkAvailability(doctorId: string, date: Date): Promise<boolean> {
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctorId },
        appointmentDate: date,
        status: Not(AppointmentStatus.CANCELLED)
      }
    });

    if (existingAppointment) {
      return false;
    }

    return await this.doctorScheduleService.checkAvailability(
      doctorId,
      date,
      date.toTimeString().slice(0, 5)
    );
  }
}
