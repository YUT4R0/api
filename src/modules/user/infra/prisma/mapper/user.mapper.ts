import { User as PrismaUser } from 'generated/prisma';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

export class UserMapper {
  static toDomain(user: PrismaUser): UserEntity {
    return new UserEntity({
      id: new UUIDValueObject(user.id),
      name: user.name,
      surname: user.surname ?? undefined,
      email: user.email,
      password: user.password,
      isManager: user.isManager,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
