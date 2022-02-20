import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let service: CreateUserService;

  const prismaMockup = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
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
        CreateUserService,
        {
          provide: PrismaService,
          useValue: prismaMockup,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when a create user', () => {
    describe('and all fields are correct', () => {
      let user: User;
      beforeEach(() => {
        user = {
          ...userInterface,
        };
        prismaMockup.user.findFirst.mockReturnValue(Promise.resolve(undefined));
        prismaMockup.user.create.mockReturnValue(Promise.resolve(user));
      });
      it('should be able a return user', async () => {
        const user = await service.execute({
          firstname: userInterface.firstname,
          lastname: userInterface.lastname,
          cellphone: userInterface.cellphone,
          email: userInterface.email,
          password: userInterface.password,
        });

        expect(user).toEqual(userInterface);
        expect(prismaMockup.user.findFirst).toBeCalledTimes(1);
        expect(prismaMockup.user.create).toBeCalledTimes(1);
      });
    });
  });

  describe('when a create user with no name', () => {
    describe('all fields are dont correct', () => {
      let user: User;
      beforeEach(() => {
        user = {
          ...userInterface,
        };
        prismaMockup.user.findFirst.mockRejectedValue(
          Promise.resolve(undefined),
        );
        prismaMockup.user.create.mockRejectedValue(Promise.resolve(undefined));
      });
      it('should not return user created', async () => {
        const userData = {
          firstname: userInterface.firstname,
          lastname: userInterface.lastname,
          cellphone: userInterface.cellphone,
          email: userInterface.email,
          password: userInterface.password,
        };

        await expect(service.execute(userData)).rejects.toEqual(
          new BadRequestException('Operação não realizada'),
        );
        expect(prismaMockup.user.findFirst).toBeCalledTimes(1);
        expect(prismaMockup.user.create).toBeCalledTimes(0);
      });
    });
  });
});
