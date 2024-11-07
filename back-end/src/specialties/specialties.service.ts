import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Console } from 'console';

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


  async remove(id: string) {
    const specialty = await this.findOne(id);

    if (!specialty) {
      throw new NotFoundException(`Specialty with ID ${id} not found`);
    }
  
    await this.specialtyRepository.softDelete(id);
  
    return { message: `User with ID ${id} has been removed` };
  }

  /* async restore(id: string) {
    const specialty = await this.findOne(id)

    console.log(`specialty: ${specialty}`);
  
    if (!specialty) {
      throw new NotFoundException(`Specialty with ID ${id} not found or not soft-deleted`);
    }

    if (!specialty.deletedAt) {
      throw new NotFoundException(`Specialty with ID ${id} is already restored`);
    }

    specialty.deletedAt = null;
    
    await this.specialtyRepository.save(specialty);
  
    return { message: `Specialty with ID ${id} has been restored` };
  } */
}
