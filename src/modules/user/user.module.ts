import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateUserUsecase } from './application/usecases/create-user/create-user.usecase';
import { DeleteUserUsecase } from './application/usecases/delete-user/delete-user.usecase';
import { GetUserByIdUsecase } from './application/usecases/get-user-by-id/get-user-by-id.usecase';
import { ListUsersUsecase } from './application/usecases/list-users/list-users.usecase';
import { UpdateUserUsecase } from './application/usecases/update-user/update-user.usecase';
import { UserRepository } from './infra/prisma/prisma-repository/user.prisma.repository';
import { UserController } from './presentation/controller/user.controller';

@Module({
  providers: [
    PrismaService,
    CreateUserUsecase,
    ListUsersUsecase,
    DeleteUserUsecase,
    GetUserByIdUsecase,
    UpdateUserUsecase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
