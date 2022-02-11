import { Body, Controller, Post } from '@nestjs/common';
import { Library, Prisma } from '@prisma/client';
import { CreateLibraryService } from 'src/modules/library/services/create-library.service';

@Controller('api/v1/library')
export class LibraryController {
  constructor(private readonly createLibraryService: CreateLibraryService) {}

  @Post('/create')
  async createLibrary(
    @Body() { name, latitude, longitue, cellphone }: Prisma.LibraryCreateInput,
  ): Promise<Library> {
    return await this.createLibraryService.execute({
      name,
      latitude,
      longitue,
      cellphone,
    });
  }
}
