import { Test, TestingModule } from '@nestjs/testing';
import { FindByFieldService } from './find-by-field.service';

describe('FindByFieldService', () => {
  let service: FindByFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByFieldService],
    }).compile();

    service = module.get<FindByFieldService>(FindByFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
