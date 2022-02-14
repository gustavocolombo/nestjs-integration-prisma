import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ListBookForLibraryService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<Book[]> {
    const booksInLibrary = await this.prismaService.book.findMany({
      where: { libraryId: id },
    });

    return booksInLibrary;
  }
}
