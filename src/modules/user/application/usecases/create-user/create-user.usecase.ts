import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';
import { CreateUserInput } from './input';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(input: CreateUserInput): Promise<any> {
    const user = UserEntity.create(input);
    const createdUser = await this.userRepository.create(user);
  }
}
