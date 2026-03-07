import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { MovieModule } from 'src/movie/movie.module';

@Global()
@Module({
  // imports: [MovieModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
