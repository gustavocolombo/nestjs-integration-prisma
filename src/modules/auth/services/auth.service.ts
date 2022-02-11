import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { FindByFieldService } from 'src/modules/user/services/find-by-field.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly findByFieldService: FindByFieldService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user): Promise<any> {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validate(email: string, password: string) {
    try {
      console.log('dados chegando', email, password);

      const user = await this.findByFieldService.execute({ email });

      if (!user) throw new NotFoundException('Usuário não encontrado');

      const comparePass = await compare(password, user.password);

      if (!comparePass)
        throw new UnauthorizedException('Credenciais inválidas');

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
