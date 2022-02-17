import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

interface BookInterface {
  ISBN: number;
  name: string;
  author: string;
  qtdPages: number;
  libraryId: string;
}

@Injectable()
export class CreateBooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    ISBN,
    author,
    name,
    qtdPages,
    libraryId,
  }: BookInterface): Promise<Book> {
    const books = await this.prismaService.book.create({
      data: {
        ISBN,
        author,
        name,
        qtdPages,
        libraryId,
      },
    });

    return books;
  }
}
