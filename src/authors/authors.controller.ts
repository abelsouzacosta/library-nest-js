import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './application/dto/create-author.dto';
import { UpdateAuthorDto } from './application/dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() data: CreateAuthorDto) {
    return this.authorsService.create(data);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAuthorDto) {
    return this.authorsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
