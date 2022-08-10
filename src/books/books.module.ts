import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { BooksRepository } from './domain/repositories/book.repository';
import { BookNotFoundMiddleware } from './infra/middlewares/book-not-found.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BookNotFoundMiddleware)
      .forRoutes(
        { path: '/books/:id', method: RequestMethod.GET },
        { path: '/books/:id', method: RequestMethod.PUT },
        { path: '/books/add_authors_to_book/:id', method: RequestMethod.PATCH },
        { path: '/books/:id', method: RequestMethod.DELETE },
      );
  }
}
