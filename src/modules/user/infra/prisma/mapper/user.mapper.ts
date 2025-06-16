import { User as PrismaUser } from 'generated/prisma';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';

export class UserMapper {
  static toDomain(user: PrismaUser): UserEntity {
    return new UserEntity({
      id: user.id,
    });
  }

  static toModel(user: UserEntity): PrismaUser {
    return {
      id: user.id.toString,
      name: user.name,
      surname: user.surname || null,
      email: user.email,
      password: user.password,
      isManager: user.isManager,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
