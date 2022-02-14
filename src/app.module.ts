import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { LibraryModule } from './modules/library/library.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, AuthModule, LibraryModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
