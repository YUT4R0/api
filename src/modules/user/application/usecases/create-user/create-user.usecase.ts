import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { PasswordValueObject } from 'src/modules/user/domain/value-object/password.vo';
import { UserRepository } from 'src/modules/user/infra/prisma/prisma-repository/user.prisma.repository';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';
import { UserOutput, UserOutputMapper } from '../common/output';
import { CreateUserInput } from './create-user.input';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async handle(input: CreateUserInput): Promise<UserOutput> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) throw new ConflictException('User alreadt exists!');

    const id = new UUIDValueObject();
    const hashedPassword = await PasswordValueObject.create(input.password, 10);

    const user = UserEntity.create({
      id,
      data: {
        ...input,
        password: hashedPassword.value,
      },
      createdAt: new Date(),
    });

    const createdUser = await this.userRepository.save(user);
    return UserOutputMapper.toOutput(createdUser);
  }
}
