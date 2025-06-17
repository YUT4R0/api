import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';
import { UserOutputMapper } from '../common/output';
import { UpdateUserInput } from './update-user.input';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async handle({ id, ...data }: UpdateUserInput) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User does not exists!');

    if (data.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        data.email,
      );
      if (userWithSameEmail)
        throw new ConflictException('E-mail already exists');
    }

    user.update(data, new Date());
    const updatedUser = await this.userRepository.save(user);
    return UserOutputMapper.toOutput(updatedUser);
  }
}
