import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';
import { UserOutput, UserOutputMapper } from '../common/output';
import { GetUserByIdInput } from './get-user-by-id.input';

@Injectable()
export class GetUserByIdUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async handle({ id }: GetUserByIdInput): Promise<UserOutput> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return UserOutputMapper.toOutput(user);
  }
}
