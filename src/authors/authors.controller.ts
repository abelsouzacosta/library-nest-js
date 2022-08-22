import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './application/dto/create-author.dto';
import { UpdateAuthorDto } from './application/dto/update-author.dto';
import { AuthGuard } from '@nestjs/passport';
import { CheckAuthorExistsPipe } from './domain/pipes/check-author-exists.pipe';

@Controller('authors')
@UseGuards(AuthGuard())
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateAuthorDto) {
    return this.authorsService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @UsePipes(CheckAuthorExistsPipe)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(CheckAuthorExistsPipe, ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateAuthorDto) {
    return this.authorsService.update(id, data);
  }

  @Delete(':id')
  @UsePipes(CheckAuthorExistsPipe)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
