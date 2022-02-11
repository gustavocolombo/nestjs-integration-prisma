import { Test, TestingModule } from '@nestjs/testing';
import { CreateLibraryService } from './create-library.service';

describe('CreateLibraryService', () => {
  let service: CreateLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateLibraryService],
    }).compile();

    service = module.get<CreateLibraryService>(CreateLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
