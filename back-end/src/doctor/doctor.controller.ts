import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Get('specialty/:specialtyId')
  async getDoctorsBySpecialty(
    @Param('specialtyId') specialtyId: string
  ) {
    return await this.doctorService.getDoctorsBySpecialty(specialtyId);
  }


  @Get('specialty-name/:specialtyName')
  async getDoctorsBySpecialtyName(
    @Param('specialtyName') specialtyName: string
  ) {
    return await this.doctorService.getDoctorsBySpecialtyName(specialtyName);
  }
}
