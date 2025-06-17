import { UserEntity } from 'src/modules/user/domain/entity/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  surname?: string;
  email: string;
  isManager: boolean;
  createdAt: Date;
};

export class UserOutputMapper {
  static toOutput(user: UserEntity): UserOutput {
    return {
      ...user,
      id: user.id.toString,
    };
  }
}
