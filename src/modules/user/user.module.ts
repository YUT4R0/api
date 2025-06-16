import { Module } from '@nestjs/common';
import { UserRepository } from './infra/prisma/prisma-repository/user.prisma.repository';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
