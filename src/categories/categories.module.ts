import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './domain/repositories/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryAlreadyExistsMiddleware } from './infra/middlewares/category-already-exists.middleware';
import { CategoryNotFoundMiddleware } from './infra/middlewares/category-not-found.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CategoryAlreadyExistsMiddleware)
      .forRoutes(
        { path: 'categories', method: RequestMethod.POST },
        { path: 'categories/:id', method: RequestMethod.PUT },
      );

    consumer
      .apply(CategoryNotFoundMiddleware)
      .forRoutes(
        { path: 'categories/:id', method: RequestMethod.GET },
        { path: 'categories/:id', method: RequestMethod.PUT },
        { path: 'categories/:id', method: RequestMethod.DELETE },
      );
  }
}
