import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PacienteService } from '../paciente/paciente.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly pacienteService: PacienteService,
        private readonly jwtService: JwtService,
    ) { }

    async register({ nombre, apellido, fecha_nacimiento,celular, email, password}: RegisterDto){

        const exiistingUser = await this.usersService.findOneByEmail(email)
        
        if (exiistingUser) {
            throw new BadRequestException('Email already exists');
        }

        const user = await this.usersService.create(
            {
                email,
                password: await bcryptjs.hash(password,10)
            }
        );
        

        const paciente = await this.pacienteService.create(
            {
                nombre,
                apellido,
                fecha_nacimiento,
                celular,
                user : user
            }
        );

        return {
            message: 'Registration successful',
            user: {
                id: user.id,
                email: user.email,
                //role: user.role
            }
        };
    }

    async login({ email, password }: LoginDto) { 
        const user = await this.usersService.findOneByEmail(email)
        
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            email
        };
    }
    
   /*  async register({ nombre, apellido,fecha_nacimiento,celular, email, password, fecha_de_registro }: RegisterDto){

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
        
    } */

    /* async login({ email, password}:LoginDto) {
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
    } */
}
