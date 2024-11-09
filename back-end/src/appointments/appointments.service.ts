import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';


import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { DoctorSchedulesService } from '../doctor-schedules/doctor-schedules.service';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { AppointmentStatus, UserRole } from '../common/enums';
import { scheduled } from 'rxjs';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';

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
    const localDate = new Date(date); 
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    localDate.setDate(localDate.getDate() + 1);
    const availableSchedules = await this.doctorScheduleService.findSchedulesByDoctorAndDate(
      doctorId, 
      localDate
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
    user: UserActiveInterface
  ): Promise<Appointment> {

    const patient = await this.patientService.findByUserEmail(user.email);
    console.log(`PATIENT ==> ${patient.id}`)   
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const checkAvailability = await this.doctorScheduleService.checkAvailability(
      createAppointmentDto.doctorId,
      createAppointmentDto.appointmentDate,
      createAppointmentDto.appointmentTime
    );

    if (checkAvailability) {
      throw new ConflictException('Slot is not available');
    }


    const localDate = new Date(createAppointmentDto.appointmentDate); 
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    localDate.setDate(localDate.getDate() + 1);
    createAppointmentDto.appointmentDate = localDate;
  
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      patient_id: patient.id,
      doctor_id: createAppointmentDto.doctorId ,
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

  async findAllUser(user: UserActiveInterface) {
    const patient = await this.patientService.findByUserEmail(user.email);

    return await this.appointmentRepository.find({
      where: { patient_id: patient.id },
    });
  }

  async findByPatient(email: string) {
    
    const patient = await this.patientService.findByUserEmail(email);
    
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    
    return await this.appointmentRepository.find({
      where: {
        patient: { 
          id: patient.id 
        }
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


  async findByDatePatient(
    date: Date,
    user: UserActiveInterface
  ) {
    const patient = await this.patientService.findByUserEmail(user.email);

    
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const appointments = await this.appointmentRepository.find({
      where: { appointmentDate: date, patient_id: patient.id },
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


  async findByDateDoctor(date: Date, user: UserActiveInterface ) {
    const doctor = await this.doctorService.findByUserEmail(user.email);

        
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const appointments = await this.appointmentRepository.find({
      where: { appointmentDate: date, doctor_id:doctor.id },
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

}


