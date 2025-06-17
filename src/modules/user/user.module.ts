import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateUserUsecase } from './application/usecases/create-user/create-user.usecase';
import { ListUsersUsecase } from './application/usecases/list-users/list-users.usecase';
import { UserRepository } from './infra/prisma/prisma-repository/user.prisma.repository';
import { UserController } from './presentation/controller/user.controller';

@Module({
  providers: [
    PrismaService,
    CreateUserUsecase,
    ListUsersUsecase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
