import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { UserRole } from '../common/enums';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
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

  @Get('01/:name')
  findByName(@Param('name') name: string) {
    return this.specialtiesService.findByName(name);
  }
  
/*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  } */
}
