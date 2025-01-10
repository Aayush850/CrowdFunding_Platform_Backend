import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  ValidationPipe,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body(ValidationPipe) authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
}
