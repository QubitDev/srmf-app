import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PacienteService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ){}
  
  create(createPacienteDto: CreatePacienteDto){
    return this.pacienteRepository.save(createPacienteDto);
  }

  findOneByEmail(email: string) {
    return this.pacienteRepository.findOneBy({ email });
  }

  findAll() {
    return `This action returns all paciente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
