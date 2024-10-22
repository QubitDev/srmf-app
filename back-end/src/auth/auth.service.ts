import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PacienteService } from '../paciente/paciente.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly pacienteService: PacienteService,
        private readonly jwtService: JwtService,
    ) { }
    
    async register({ nombre, apellido,fecha_nacimiento,celular, email, password, fecha_de_registro }: RegisterDto){

        const paciente = await this.pacienteService.findOneByEmail(email)
        
        if (paciente) {
            throw new BadRequestException('Email already exists');
        }

        return await this.pacienteService.create(
            {
                nombre,
                apellido,
                fecha_nacimiento,
                celular,
                email,
                password: await bcryptjs.hash(password,10),
                fecha_de_registro
            }
        );
        
    }

    async login({ email, password}:LoginDto) {
        const paciente = await this.pacienteService.findOneByEmail(email)
        
        if (!paciente) {
            throw new UnauthorizedException('email is wrong');
        }

        const isMatch = await bcryptjs.compare(password, paciente.password);

        if (!isMatch) {
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { email: paciente.email }
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            email
        };
    }
}
