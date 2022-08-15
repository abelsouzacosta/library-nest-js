import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';
import { StudentsRepository } from './domain/repositories/students.repository';
import { StudentNotFoundMiddleware } from './infra/middlewares/student-not-found.middleware';
import { RegisterNumberAlreadyTakenMiddleware } from './infra/middlewares/register-number-already-taken.middleware';
import { EmailAlreadyTakenMiddleware } from './infra/middlewares/email-already-taken.middleware';
import { SsnAlreadyTakenMiddleware } from './infra/middlewares/ssn-already-taken.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentNotFoundMiddleware)
      .forRoutes(
        { path: 'students/:id', method: RequestMethod.GET },
        { path: 'students/:id', method: RequestMethod.PUT },
      );

    consumer
      .apply(
        RegisterNumberAlreadyTakenMiddleware,
        EmailAlreadyTakenMiddleware,
        SsnAlreadyTakenMiddleware,
      )
      .forRoutes(
        { path: 'students/', method: RequestMethod.POST },
        { path: 'students/:id', method: RequestMethod.PUT },
      );
  }
}
