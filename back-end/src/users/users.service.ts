import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { UserRole } from 'src/shared/enums';
import { RegisterDoctorDto } from './dto/registerDoctor.dto';
import { SpecialtiesService } from 'src/specialties/specialties.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
