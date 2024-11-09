import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patients } from './entities/patient.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patients)
    private readonly patientRepository: Repository<Patients>,
  ) { }
  
  create(createPatientDto: CreatePatientDto) {
    return this.patientRepository.save(createPatientDto);
  }

  async findAll() {
    return await this.patientRepository.find({
      relations: ['user', 'appointments']
    });
  }

  async findOne(id: string) {
    return await this.patientRepository.findOne({
      where: { id: id },
      relations: ['user', 'appointments']
    });
  }

  async findByUserEmail(email: string): Promise<Patients> {     
    const patient = await this.patientRepository.findOne({       
        relations: {         
            user: true       
        },       
        where: {         
            user: {           
                email: email         
            }       
        }     
    });

    if (!patient) {
        throw new NotFoundException('Patient not found');
    }

    return patient;
  }
}