import { Injectable } from '@nestjs/common';
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
    let library = await this.prismaService.library.findFirst({
      where: { name: name },
    });

    if (!library) {
      library = await this.prismaService.library.create({
        data: {
          name,
          latitude,
          longitue,
          cellphone,
        },
      });
      return library;
    }

    return library;
  }
}
