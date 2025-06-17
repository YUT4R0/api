import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

export interface IUserRepository {
  findById(id: UUIDValueObject): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[] | []>;
  save(user: UserEntity): Promise<UserEntity>;
  delete(user: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
