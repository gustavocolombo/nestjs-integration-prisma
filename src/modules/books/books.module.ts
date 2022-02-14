import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateBooksService } from './services/create-books.service';
import { BooksController } from './infra/http/controllers/books.controller';
import { ListBookForLibraryService } from './services/list-book-for-library.service';

@Module({
  providers: [CreateBooksService, ListBookForLibraryService, PrismaService],
  controllers: [BooksController],
})
export class BooksModule {}
