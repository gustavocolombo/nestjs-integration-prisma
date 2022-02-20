import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Library } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { ListLibrariesService } from './list-libraries.service';

describe('ListLibrariesService', () => {
  let service: ListLibrariesService;

  const prismaMockup = {
    library: {
      findMany: jest.fn(),
    },
  };

  const listLibraries: Library[] = [
    {
      name: 'segunda biblioteca de teste',
      cellphone: '85 98118-0798',
      qtdBooks: 71,
      latitude: -44.18236,
      longitue: -45.18273,
      id: '12344',
    },
    {
      name: 'segunda biblioteca de teste',
      cellphone: '85 98118-0798',
      qtdBooks: 71,
      latitude: -44.18236,
      longitue: -45.18273,
      id: '12344',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListLibrariesService,
        {
          provide: PrismaService,
          useValue: prismaMockup,
        },
      ],
    }).compile();

    service = module.get<ListLibrariesService>(ListLibrariesService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when list all libraries', () => {
    describe('and libraries exists', () => {
      let library: Library[];
      beforeEach(() => {
        library = {
          ...listLibraries,
        };

        prismaMockup.library.findMany.mockReturnValue(Promise.resolve(library));
      });
      it('should return a list of libraries', async () => {
        const libraries = await service.execute();

        expect(libraries).toEqual(listLibraries);
      });
    });
  });

  describe('when no library was created', () => {
    describe('no library should returned ', () => {
      let library: Library[];
      beforeEach(() => {
        library = {
          ...listLibraries,
        };
        prismaMockup.library.findMany.mockRejectedValue(
          Promise.resolve(library),
        );
      });
      it('should not be able return list empty', async () => {
        await expect(service.execute()).rejects.toEqual(
          new BadRequestException('Operação não realizada'),
        );
      });
    });
  });
});
