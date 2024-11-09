import { IsDate } from 'class-validator';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { DoctorService } from '../doctor/doctor.service';
import { UserRole } from '../common/enums';
import { RegisterDoctorDto } from './dto/registerDoctor.dto';
import { SpecialtiesService } from '../specialties/specialties.service';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly doctorService: DoctorService,
    private readonly specialtiesService : SpecialtiesService,
  ){}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async registerDoctor({ name, lastName, phone, document, email, password, specialty, licenseNumber, consultingRoom }: RegisterDoctorDto) {
    const exiistingUser = await this.findOneByEmail(email)
        
    if (exiistingUser) {
      throw new BadRequestException('Email already exists');
    }
    
    const user = await this.userRepository.save({
      name,
      lastName,
      phone,
      document,
      role: UserRole.DOCTOR,
      email,
      password: await bcryptjs.hash(password, 10),
      createdAt: new Date(),
    }); 

    const specialtyEntity = await this.specialtiesService.findByName(specialty);

    const doctor = await this.doctorService.createDoctor({
      licenseNumber: licenseNumber,
      consultingRoom: consultingRoom,
      createdAt: new Date(),
      specialty: specialtyEntity,
      user: user,
    });  

    return  {
            message: 'Registration successful',
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
  }

  findOneByEmail(email:string) {
    return this.userRepository.findOneBy({email});
  }

  findOneByEmailWithPassword(email:string) {
    return this.userRepository.findOne({
      where: {email},
      select: ['id', 'name', 'lastName', 'phone','email', 'role', 'password']
    });
  }

  findAll() {
    return this.userRepository.find();
  }


  async findUserWithRole(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['doctor', 'paciente']
    });
  }

  async findAllRoleDoctors() {
    return await this.userRepository.find({
      where: { role: UserRole.DOCTOR },
      relations: ['doctor']
    });
  }

  async findAllRolePatients() {
    return await this.userRepository.find({
      where: { role: UserRole.PATIENT },
      relations: ['patient']
    });
  }

  findOneById(id: string) {
    return this.userRepository.findOneBy({id})
  }

  findOneByIdWithPassword(id:string) {
    return this.userRepository.findOne({
      where: {id},
      select: ['id', 'name', 'lastName', 'phone','email', 'role', 'password']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
  
    const user = await this.findOneByIdWithPassword(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto)
    user.updatedAt = new Date();

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    await this.userRepository.softDelete(id);
  
    return { message: `User with ID ${id} has been removed` };
  }
}
