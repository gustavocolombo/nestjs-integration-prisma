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
        prismaMockup.library.findFirst.mockReturnValue(
          Promise.resolve(library),
        );
        prismaMockup.library.create.mockReturnValue(Promise.resolve(library));
      });
      it('should return a library', async () => {
        const library = await service.execute({
          name: libraryInterface.name,
          cellphone: libraryInterface.cellphone,
          latitude: libraryInterface.latitude,
          longitue: libraryInterface.longitue,
          qtdBooks: libraryInterface.qtdBooks,
        });

        expect(library).toEqual(libraryInterface);
      });
    });
  });
});
