import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ) {
        console.log(registerDto);
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ) {
        return this,this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(
        @Request() req
    ) {
        return req.paciente;
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfileDoctor(
        @Request() req
    ) {
        return req.doctor;
    }
}
