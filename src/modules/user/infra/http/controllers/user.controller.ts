import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserService } from 'src/modules/user/services/create-user.service';
import { FindByFieldService } from 'src/modules/user/services/find-by-field.service';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findByFieldService: FindByFieldService,
  ) {}

  @Post('/create')
  async createUser(
    @Body()
    { firstname, lastname, cellphone, email, password }: Prisma.UserCreateInput,
  ): Promise<User> {
    return await this.createUserService.execute({
      firstname,
      lastname,
      cellphone,
      email,
      password,
    });
  }

  @Get('/:email')
  async getByEmail(
    @Param() { email }: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.findByFieldService.execute({ email });
  }
}
