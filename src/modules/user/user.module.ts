import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './infra/http/controllers/user.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { createUserAuth } from 'src/shared/validations/users/create.users.auth';
import { FindByFieldService } from './services/find-by-field.service';

@Module({
  providers: [CreateUserService, PrismaService, FindByFieldService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createUserAuth)
      .forRoutes({ path: '/api/v1/users/create', method: RequestMethod.POST });
  }
}
