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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
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
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
