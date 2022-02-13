import { Injectable, NotFoundException } from '@nestjs/common';
import { Library } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ListLibrariesService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Library[] | null> {
    const libraries = await this.prismaService.library.findMany();

    if (libraries.length == 0) {
      throw new NotFoundException('Nenhuma biblioteca foi encontrada');
    }

    return libraries || null;
  }
}
