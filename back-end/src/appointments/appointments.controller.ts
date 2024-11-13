import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

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

  @Get('available-slots')
  async getAvailableTimeSlots(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string
  ) {
    try { const appointmentDate = new Date(date);
      if (isNaN(appointmentDate.getTime())) {
        throw new Error('Invalid date format'); 
      } 

      console.log(`Received doctorId: ${doctorId}, date: ${appointmentDate}`); 
      const slots = await this.appointmentsService.getAvailableTimeSlots(doctorId, appointmentDate); 
      console.log(`Available slots: ${JSON.stringify(slots)}`); 
      return slots; 
      } catch (error) {
        console.error('Error getting available slots:', error);
      throw error;
    }
  }
  

  @Post()
  @Auth(UserRole.PATIENT)
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @ActiveUser() user: UserActiveInterface) {      
    return await this.appointmentsService.createAppointment(
      createAppointmentDto,
      user
    );
  }


  @Get('doctor/:doctorId')
  @Auth(UserRole.DOCTOR)
  findByDoctor(@Param('doctorId') doctorId: string, @ActiveUser() user: UserActiveInterface) {
    return this.appointmentsService.findByDoctor(doctorId);
  }

  @Get('patient/:patientId')
  @Auth(UserRole.PATIENT)
  findByPatient(@Param('patientId') patientId: string, @ActiveUser() user: UserActiveInterface) {
    return this.appointmentsService.findByPatient(user.email);
  }


  @Get(':date')
  @Auth(UserRole.PATIENT)
  findByDatePatient(@Param('date') date: string, @ActiveUser() user: UserActiveInterface) {
    return this.appointmentsService.findByDatePatient(new Date(date), user);
  }

  
  @Get(':date')
  @Auth(UserRole.PATIENT)
  findByDateDoctor(@Param('date') date: string, @ActiveUser() user: UserActiveInterface) {
    return this.appointmentsService.findByDateDoctor(new Date(date), user);
  }



  @Get()
  @Auth(UserRole.PATIENT)
  findAllUser(@ActiveUser() activeUser: UserActiveInterface) {
    return this.appointmentsService.findAllUser(activeUser);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post(':id')
  @Auth(UserRole.DOCTOR)
  updateAppointmentsStatus(@Param('id') id: string, @Body() UpdateAppointmentDto: UpdateAppointmentDto, @ActiveUser() user: UserActiveInterface){
    return this.appointmentsService.updateAppointmetStatus(id, UpdateAppointmentDto, user);
  }
}
