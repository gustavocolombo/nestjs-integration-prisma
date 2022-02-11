import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) {}

  async execute({
    firstname,
    lastname,
    email,
    password,
    cellphone,
  }: Prisma.UserCreateInput): Promise<User> {
    let user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      const hashedPass = await hash(password, 8);

      user = await this.prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPass,
          cellphone,
        },
      });

      return user;
    }

    return user;
  }
}
