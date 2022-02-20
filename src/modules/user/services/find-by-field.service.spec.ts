import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { FindByFieldService } from './find-by-field.service';

describe('FindByFieldService', () => {
  let service: FindByFieldService;

  const prismaMockup = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const userInterface: User = {
    firstname: 'Gustavo',
    lastname: 'Colombo',
    email: 'gusttavocolombo@gmail.com',
    password: 'senha1234',
    cellphone: '85 981180797',
    id: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByFieldService,
        {
          provide: PrismaService,
          useValue: prismaMockup,
        },
      ],
    }).compile();

    service = module.get<FindByFieldService>(FindByFieldService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when a find user with specific field', () => {
    describe('field of search are correct', () => {
      let user: User;
      beforeEach(() => {
        user = {
          ...userInterface,
        };
        prismaMockup.user.findUnique.mockReturnValue(Promise.resolve(user));
      });
      it('should be able return a user', async () => {
        const userData = { id: '12345' };

        const user = await service.execute(userData);

        expect(user).toEqual(userInterface);
        expect(prismaMockup.user.findUnique).toBeCalledTimes(1);
      });
    });
  });

  describe('when a method called with no arguments', () => {
    describe('no field was sended', () => {
      let user: User;
      beforeEach(() => {
        user = {
          ...userInterface,
        };
        prismaMockup.user.findUnique.mockRejectedValue(
          Promise.resolve(undefined),
        );
      });
      it('should not return user', async () => {
        const userData = { id: '12345' };

        await expect(service.execute(userData)).rejects.toEqual(
          new BadRequestException('Operação não realizada'),
        );
        expect(prismaMockup.user.findUnique).toBeCalledTimes(1);
      });
    });
  });
});
