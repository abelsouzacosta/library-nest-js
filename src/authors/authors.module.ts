import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './entities/author.entity';
import { AuthorsRepository } from './domain/repositories/authors.repository';
import { AuthorNotFoundMiddleware } from './infra/middlewares/author-not-found.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository],
})
export class AuthorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorNotFoundMiddleware).forRoutes(
      {
        path: '/authors/:id',
        method: RequestMethod.GET,
      },
      {
        path: '/authors/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/authors/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
