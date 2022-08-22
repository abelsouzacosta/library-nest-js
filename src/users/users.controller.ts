import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './application/dto/create-user.dto';
import { HashPasswordPipe } from './domain/pipes/hash-password.pipe';
import { CheckEmailAlreadyTakenPipe } from './domain/pipes/check-email-already-taken.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe, CheckEmailAlreadyTakenPipe, HashPasswordPipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
