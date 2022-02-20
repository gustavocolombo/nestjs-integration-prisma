import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Library } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class ListLibrariesService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Library[] | null> {
    try {
      const libraries = await this.prismaService.library.findMany();

      if (libraries.length == 0) {
        throw new NotFoundException('Nenhuma biblioteca foi encontrada');
      }

      console.log(libraries);

      return libraries || null;
    } catch (error) {
      throw new BadRequestException('Operação não realizada');
    }
  }
}
