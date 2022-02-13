import { Test, TestingModule } from '@nestjs/testing';
import { ListLibrariesService } from './list-libraries.service';

describe('ListLibrariesService', () => {
  let service: ListLibrariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListLibrariesService],
    }).compile();

    service = module.get<ListLibrariesService>(ListLibrariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
