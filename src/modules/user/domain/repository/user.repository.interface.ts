import { UserEntity } from 'src/modules/user/domain/entity/user.entity';

export interface IUserRepository {
  findById(id: string): UserEntity;
  create(user: UserEntity): Promise<any>;
  update(id: string, user: any): Promise<any>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
