import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Put,
  Patch,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './application/dto/create-book.dto';
import { UpdateBookDto } from './application/dto/update-book.dto';
import { AddAuthorsDto } from './application/dto/add-authors.dto';
import { ValidateIsbnPipe } from './domain/pipes/validate-isbn.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(ValidationPipe, ValidateIsbnPipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateBookDto) {
    return this.booksService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    return this.booksService.update(id, data);
  }

  @Patch('/add_authors_to_book/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  addAuthors(@Param('id') id: string, @Body() data: AddAuthorsDto) {
    return this.booksService.addAuthors(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
