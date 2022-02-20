import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class FindByFieldService {
  constructor(private prismaService: PrismaService) {}

  async execute(data: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: data,
      });

      return user || null;
    } catch (error) {
      throw new BadRequestException('Operação não realizada');
    }
  }
}
