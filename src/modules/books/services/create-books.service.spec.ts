import { Test, TestingModule } from '@nestjs/testing';
import { CreateBooksService } from './create-books.service';

describe('CreateBooksService', () => {
  let service: CreateBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBooksService],
    }).compile();

    service = module.get<CreateBooksService>(CreateBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
