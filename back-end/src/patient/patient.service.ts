import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patients } from './entities/patient.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patients)
    private readonly pacienteRepository: Repository<Patients>,
  ){}
  
  create(createPatientDto: CreatePatientDto){
    return this.pacienteRepository.save(createPatientDto);
  }

  /* findOneByEmail(email: string) {
    return this.pacienteRepository.findOneBy({ email });
  } */

  findAll() {
    return `This action returns all paciente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
