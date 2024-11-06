import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtiesService {

  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ){}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    const existingSpecialty = await this.findByName(createSpecialtyDto.name);

    if (existingSpecialty) {
      throw new BadRequestException('Specialty already exists');
    }
    
    return await this.specialtyRepository.save(createSpecialtyDto);
  }

  async findAll() {
    return await this.specialtyRepository.find();
  }

/*   async findAllName() {
    return await this.specialtyRepository.find({
      select: ['name', 'id'],
    });
  } */

  async findOne(id: string) {
    return await this.specialtyRepository.findOne({
      where: { id },
      relations: ['doctors', 'doctors.user']
    });
  }

  async findByName(name: string) {

    const specialty = await this.specialtyRepository.findOne({
      where: { name },
      relations: ['doctors.user'],
    });
    
    if (!specialty) {
      throw new Error('Especialidad no encontrada');
    }

    return specialty;
  }

  async findAvailableDoctors(specialtyId: string) {
    return await this.specialtyRepository.findOne({
      where: { id: specialtyId },
      relations: ['doctors', 'doctors.schedules', 'doctors.user']
    });
  }
}
