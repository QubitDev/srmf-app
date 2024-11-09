import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserRole } from '../common/enums';
import { RegisterDoctorDto } from './dto/registerDoctor.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('register')
  registerDoctor(@Body() registerDoctorDto: RegisterDoctorDto) {
    return this.userService.registerDoctor(registerDoctorDto);  
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('doctor')
  findAllRoleDoctors() {
    return this.userService.findAllRoleDoctors();
  }

  @Get('patient')
  findAllRolePatients() {
    return this.userService.findAllRolePatients();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
