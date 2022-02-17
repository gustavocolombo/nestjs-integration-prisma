import { Test, TestingModule } from '@nestjs/testing';
import { CreateBooksService } from './create-books.service';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { Book, Prisma, User } from '@prisma/client';

describe('CreateBooksService', () => {
  let bookService: CreateBooksService;

  const prismaMockup = {
    book: {
      create: jest.fn(),
    },
  };

  const bookInterface: Book = {
    ISBN: 128974323,
    name: 'novo livro',
    author: 'nome autor',
    qtdPages: 580,
    libraryId: '12345',
    createdAt: new Date(),
    id: '123455',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBooksService,
        {
          provide: PrismaService,
          useValue: prismaMockup,
        },
      ],
    }).compile();

    bookService = module.get<CreateBooksService>(CreateBooksService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('when creating a book', () => {
    describe('and all fields are correct', () => {
      let book: Book;
      beforeEach(() => {
        book = {
          ...bookInterface,
        };
        prismaMockup.book.create.mockReturnValue(Promise.resolve(book));
      });
      it('should return a user', async () => {
        const fetchedBook = await bookService.execute({
          ISBN: bookInterface.ISBN,
          author: bookInterface.author,
          libraryId: bookInterface.libraryId,
          name: bookInterface.name,
          qtdPages: bookInterface.qtdPages,
        });

        expect(fetchedBook).toEqual(bookInterface);
      });
    });
  });
});
