import { Module } from '@nestjs/common';
import { CreateLibraryService } from './services/create-library.service';
import { LibraryController } from './infra/http/controllers/library.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ListLibrariesService } from './services/list-libraries.service';

@Module({
  providers: [CreateLibraryService, PrismaService, ListLibrariesService],
  controllers: [LibraryController],
})
export class LibraryModule {}
