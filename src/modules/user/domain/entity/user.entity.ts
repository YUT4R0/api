import { Entity } from 'src/shared/domain/entity';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

type UserEntityData = {
  name: string;
  surname?: string;
  email: string;
  password: string;
  isManager: boolean;
};

type UserEntityProps = {
  id: UUIDValueObject;
  data: UserEntityData;
  createdAt: Date;
  updatedAt?: Date;
};

export type UserEntityMutableData = Partial<UserEntityData>;

export class UserEntity extends Entity {
  private readonly id: UUIDValueObject;
  private data: UserEntityData;
  private createdAt: Date;
  private updatedAt?: Date;

  constructor(props: UserEntityProps) {
    super();
    this.id = props.id;
    this.data = props.data;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
  }

  public update(newData: UserEntityMutableData, updatedAt: Date) {
    if (newData.name) this.data.name = newData.name;
    if (newData.surname) this.data.surname = newData.surname;
    if (newData.email) this.data.email = newData.email;
    if (newData.password) this.data.password = newData.password;
    if (newData.isManager) this.data.isManager = newData.isManager;
    this.updatedAt = updatedAt;
  }

  get entityId(): UUIDValueObject {
    return this.id;
  }

  get userData(): UserEntityData {
    return this.data;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt ?? new Date();
  }
}
