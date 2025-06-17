import { User as PrismaUser } from 'generated/prisma';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

export class UserMapper {
  static toDomain(user: PrismaUser): UserEntity {
    return new UserEntity({
      id: new UUIDValueObject(user.id),
      data: {
        name: user.name,
        surname: user.surname ?? undefined,
        email: user.email,
        password: user.password,
        isManager: user.isManager,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  static toModel({
    entityId,
    userData,
    getCreatedAt,
    getUpdatedAt,
  }: UserEntity): PrismaUser {
    return {
      id: entityId.toString,
      name: userData.name,
      surname: userData.surname ?? null,
      email: userData.email,
      password: userData.password,
      isManager: userData.isManager,
      createdAt: getCreatedAt,
      updatedAt: getUpdatedAt,
    };
  }
}
