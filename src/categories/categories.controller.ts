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
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './application/dto/create-category.dto';
import { UpdateCategoryDto } from './application/dto/update-category.dto';
import { AddBoookToCategoryDto } from './application/dto/add-book-to-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { CheckNameAlreadyTakenPipe } from './domain/pipes/check-name-already-taken.pipe';
import { CheckCategoryExistsPipe } from './domain/pipes/check-category-exists.pipe';

@Controller('categories')
@UseGuards(AuthGuard())
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe, CheckNameAlreadyTakenPipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UsePipes(CheckCategoryExistsPipe)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(CheckCategoryExistsPipe, CheckNameAlreadyTakenPipe, ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Patch('add_books/:id')
  @UsePipes(CheckCategoryExistsPipe, ValidationPipe)
  addBooksToCategory(
    @Param('id') id: string,
    @Body() data: AddBoookToCategoryDto,
  ) {
    return this.categoriesService.addBooksToCategory(id, data);
  }

  @Delete(':id')
  @UsePipes(CheckCategoryExistsPipe)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
