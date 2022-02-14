import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Book, Library } from '@prisma/client';
import { ListBookForLibraryService } from 'src/modules/books/services/list-book-for-library.service';
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
  constructor(
    private createBookService: CreateBooksService,
    private findBookForLibService: ListBookForLibraryService,
  ) {}

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

  @Get('/get-books/:id')
  async getBooksForLibrary(@Param('id') id: string): Promise<Book[]> {
    return await this.findBookForLibService.execute(id);
  }
}
