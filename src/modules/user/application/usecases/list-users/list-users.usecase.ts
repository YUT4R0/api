import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';
import { UserOutput, UserOutputMapper } from '../common/output';

@Injectable()
export class ListUsersUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async handle(): Promise<UserOutput[]> {
    const users = await this.userRepository.findAll();
    return users.map((u: UserEntity) => UserOutputMapper.toOutput(u));
  }
}
