import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../services/auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.authService.validate(email, password);

      console.log('caiu aqui');

      return user;
    } catch (error) {
      throw new BadRequestException('Desculpe, operação não finalizada');
    }
  }
}
