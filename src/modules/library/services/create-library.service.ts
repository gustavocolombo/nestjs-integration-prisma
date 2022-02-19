import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Library, Prisma } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class CreateLibraryService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    name,
    longitue,
    latitude,
    cellphone,
  }: Prisma.LibraryCreateInput): Promise<Library> {
    try {
      const library = await this.prismaService.library.findFirst({
        where: { name: name },
      });

      if (library)
        throw new UnauthorizedException('Biblioteca com nome já existente');

      const newLibrary = await this.prismaService.library.create({
        data: {
          name,
          latitude,
          longitue,
          cellphone,
        },
      });

      return newLibrary;
    } catch (error) {
      throw new BadRequestException('Operação não realizada');
    }
  }
}
