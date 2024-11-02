import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';


import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { UserRole } from 'src/shared/enums';
import { Auth } from './decorators/auth.decorator';


interface RequestWithUser extends Request{
    user:{
        email: string;
        role: string;
    }
}

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
    @Auth(UserRole.ADMIN)
    getProfile(
        @Req() req: RequestWithUser
    ) {
        return req.user;
    }

}
