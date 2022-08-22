import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './domain/repositories/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
