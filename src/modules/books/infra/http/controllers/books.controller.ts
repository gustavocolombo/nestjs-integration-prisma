import { Body, Controller, Post } from '@nestjs/common';
import { Book } from '@prisma/client';
import { CreateBooksService } from '../../../services/create-books.service';

interface BookInterface {
  ISBN: number;
  name: string;
  author: string;
  qtdPages: number;
  libraryId: string;
}

@Controller('api/v1/books')
export class BooksController {
  constructor(private createBookService: CreateBooksService) {}

  @Post('/create')
  async createBooks(
    @Body() { ISBN, author, name, qtdPages, libraryId }: BookInterface,
  ): Promise<Book> {
    return await this.createBookService.execute({
      ISBN,
      author,
      libraryId,
      name,
      qtdPages,
    });
  }
}
