import { UserEntity } from 'src/modules/user/domain/entity/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  surname?: string;
  email: string;
  isManager: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class UserOutputMapper {
  static toOutput(user: UserEntity): UserOutput {
    return {
      id: user.entityId.toString,
      ...user.userData,
      createdAt: user.getCreatedAt,
      updatedAt: user.getUpdatedAt,
    };
  }
}
