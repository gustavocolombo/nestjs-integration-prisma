import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
      const book = await this.prismaService.book.findFirst({
        where: { ISBN: ISBN },
      });

      if (book) throw new UnauthorizedException('ISBN já existe');

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
    } catch (error) {
      throw new BadRequestException('Operação não realizada');
    }
  }
}
