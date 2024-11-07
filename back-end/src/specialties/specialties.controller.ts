import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { UserRole } from '../common/enums';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @Auth(UserRole.PATIENT)
  findAll() {
    return this.specialtiesService.findAll();
  }

/*   @Get('name')
  findAllName() {
    return this.specialtiesService.findAllName();
  } */

  @Get(':id')
  @Auth(UserRole.PATIENT)
  findOne(@Param('id') id: string) {
    return this.specialtiesService.findOne(id);
  }

  @Get('specialty-name/:name')
  @Auth(UserRole.PATIENT)
  findByName(@Param('name') name: string) {
    return this.specialtiesService.findByName(name);
  }
  
/*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }*/

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  } 

 /*  @Post(':id/restore')
  @Auth(UserRole.ADMIN)
  restoreSpecialty(@Param('id') id: string) {
    return this.specialtiesService.restore(id);
  } */
}
