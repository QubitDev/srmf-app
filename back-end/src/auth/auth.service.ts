import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PatientService } from '../patient/patient.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/enums/user-role.enum';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly patientService: PatientService,
        private readonly jwtService: JwtService,
    ) { }

    async register({ name, lastName, phone,document, email, password}: RegisterDto){

        const exiistingUser = await this.usersService.findOneByEmail(email)
        
        if (exiistingUser) {
            throw new BadRequestException('Email already exists');
        }

        const user = await this.usersService.create(
            {
                name,
                lastName,
                phone,
                document,
                role: UserRole.PATIENT,
                email,
                password: await bcryptjs.hash(password, 10),
                createdAt:new Date(),
            }
        );
        

        const paciente = await this.patientService.create(
            {
                user: user,
                createdAt: new Date()
            }
        );

        return {
            message: 'Registration successful',
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
    }

    async login({ email, password }: LoginDto) { 
        const user = await this.usersService.findOneByEmailWithPassword(email)
        
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { email: user.email , role: user.role}
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            user: {
                email: user.email,
                role: user.role
            }
        };
    }
}
