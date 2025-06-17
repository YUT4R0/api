import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

export interface IUserRepository {
  findById(id: UUIDValueObject): Promise<UserEntity>;
  findAll(): Promise<UserEntity[] | []>;
  create(user: UserEntity): Promise<UserEntity>;
  update(id: UUIDValueObject, user: UserEntity): Promise<any>;
  delete(id: UUIDValueObject): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
