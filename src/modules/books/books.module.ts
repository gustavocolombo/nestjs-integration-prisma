import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateBooksService } from './services/create-books.service';
import { BooksController } from './infra/http/controllers/books.controller';

@Module({
  providers: [CreateBooksService, PrismaService],
  controllers: [BooksController],
})
export class BooksModule {}
