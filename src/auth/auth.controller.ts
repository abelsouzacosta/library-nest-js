import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './application/dto/create-auth.dto';
import { CheckUserExistsPipe } from './domain/pipes/check-user-exists.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe, CheckUserExistsPipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateAuthDto) {
    return this.authService.create(data);
  }
}
