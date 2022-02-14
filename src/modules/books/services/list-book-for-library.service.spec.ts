import { Test, TestingModule } from '@nestjs/testing';
import { ListBookForLibraryService } from './list-book-for-library.service';

describe('ListBookForLibraryService', () => {
  let service: ListBookForLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListBookForLibraryService],
    }).compile();

    service = module.get<ListBookForLibraryService>(ListBookForLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
