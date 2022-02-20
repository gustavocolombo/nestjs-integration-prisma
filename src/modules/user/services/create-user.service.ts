import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: email },
      });

      if (user)
        throw new UnauthorizedException('Usuário com dados já existente');

      const hashedPass = await hash(password, 8);

      const newUser = await this.prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPass,
          cellphone,
        },
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException('Operação não realizada');
    }
  }
}
