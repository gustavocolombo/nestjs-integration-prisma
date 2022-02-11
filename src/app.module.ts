import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { LibraryModule } from './modules/library/library.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, AuthModule, LibraryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
