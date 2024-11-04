import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UserRole } from '../common/enums';
import { Auth } from '../auth/decorators/auth.decorator';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { DoctorService } from 'src/doctor/doctor.service';

@Controller('appointments')
export class AppointmentsController {

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly specialtyService: SpecialtiesService,
    private readonly doctorService: DoctorService,
  ) { }

  @Get('specialties')
  async getAllSpecialties() {
      return await this.specialtyService.findAll();
  }

  @Get('doctors/specialty/:specialtyId')
  async getDoctorsBySpecialty(
    @Param('specialtyId') specialtyId: string
  ) {
    return await this.doctorService.getDoctorsBySpecialty(specialtyId);
  }

  @Get('available-slots')
  async getAvailableTimeSlots(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string
  ) {
    return await this.appointmentsService.getAvailableTimeSlots(doctorId, date);
  }


  @Post()
  @Auth(UserRole.PATIENT)
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @ActiveUser() activeUser: UserActiveInterface) {      
    return await this.appointmentsService.createAppointment(
      createAppointmentDto,
      activeUser.email
    );
  }

  @Get('doctor/:doctorId')
  @Auth(UserRole.DOCTOR)
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.appointmentsService.findByDoctor(doctorId);
  }

  @Get('patient/:patientId')
  @Auth(UserRole.PATIENT)
  findByPatient(@Param('patientId') patientId: string) {
    return this.appointmentsService.findByPatient(patientId);
  }


  @Get('availability/:doctorId')
  checkAvailability(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string
  ) {
    return this.appointmentsService.checkAvailability(doctorId, new Date(date));
  }
}
