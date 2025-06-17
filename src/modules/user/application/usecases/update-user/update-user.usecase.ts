import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async handle() {}
}
