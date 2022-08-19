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
import { SsnAlreadyTakenMiddleware } from './infra/middlewares/ssn-already-taken.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('STUDENTS_UPLOAD_DIRECTORY'),
      }),
    }),
    AuthModule,
    UsersModule,
    JwtModule,
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
      .apply(RegisterNumberAlreadyTakenMiddleware, SsnAlreadyTakenMiddleware)
      .forRoutes(
        { path: 'students/', method: RequestMethod.POST },
        { path: 'students/:id', method: RequestMethod.PUT },
      );
  }
}
