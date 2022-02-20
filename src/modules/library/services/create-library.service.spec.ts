import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Library } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateLibraryService } from './create-library.service';

describe('CreateLibraryService', () => {
  let service: CreateLibraryService;

  const prismaMockup = {
    library: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  const libraryInterface: Library = {
    name: 'biblioteca de teste',
    cellphone: '85 98118-0797',
    qtdBooks: 30,
    latitude: -45.18237,
    longitue: -43.18273,
    id: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLibraryService,
        {
          provide: PrismaService,
          useValue: prismaMockup,
        },
      ],
    }).compile();

    service = module.get<CreateLibraryService>(CreateLibraryService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a library', () => {
    describe('all fields are correct', () => {
      let library: Library;
      beforeEach(() => {
        library = {
          ...libraryInterface,
        };
        prismaMockup.library.findFirst.mockReturnValue(undefined);
        prismaMockup.library.create.mockReturnValue(Promise.resolve(library));
      });
      it('should return a library', async () => {
        const data = {
          name: 'livro 1',
          cellphone: '85981180797',
          latitude: -43.28374,
          longitue: -44.19082,
          qtdBooks: 30,
        };

        const library = await service.execute(data);

        expect(library).toEqual(libraryInterface);
        expect(prismaMockup.library.findFirst).toBeCalledTimes(1);
        expect(prismaMockup.library.create).toBeCalledTimes(1);
      });
    });
  });

  describe('when a creating a library with name exists', () => {
    describe('are fields are dont correct', () => {
      let library: Library;
      beforeEach(() => {
        library = {
          ...libraryInterface,
        };
        prismaMockup.library.findFirst.mockRejectedValue(
          Promise.resolve(library),
        );
        prismaMockup.library.create.mockRejectedValue(Promise.resolve(library));
      });
      it('should not return a library', async () => {
        await expect(
          service.execute({
            name: libraryInterface.name,
            cellphone: libraryInterface.cellphone,
            latitude: libraryInterface.latitude,
            longitue: libraryInterface.longitue,
            qtdBooks: 30,
          }),
        ).rejects.toEqual(new BadRequestException('Operação não realizada'));

        expect(prismaMockup.library.findFirst).toBeCalledTimes(1);
        expect(prismaMockup.library.create).toBeCalledTimes(0);
      });
    });
  });
});
