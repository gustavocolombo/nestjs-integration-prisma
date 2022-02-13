import { Body, Controller, Get, Post } from '@nestjs/common';
import { Library, Prisma } from '@prisma/client';
import { CreateLibraryService } from 'src/modules/library/services/create-library.service';
import { ListLibrariesService } from 'src/modules/library/services/list-libraries.service';

@Controller('api/v1/library')
export class LibraryController {
  constructor(
    private readonly createLibraryService: CreateLibraryService,
    private readonly listLibrariesService: ListLibrariesService,
  ) {}

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

  @Get('/list-libraries')
  async listLibraries(): Promise<Library[] | null> {
    return await this.listLibrariesService.execute();
  }
}
