import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';
import { DeleteUserInput } from './delete-user.input';

@Injectable()
export class DeleteUserUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async handle(param: DeleteUserInput): Promise<void> {
    const user = await this.userRepository.findById(param.id);
    if (!user) throw new NotFoundException('User does not exists');
    await this.userRepository.delete(user);
  }
}
