import { Entity } from 'src/shared/domain/entity';
import { ValueObject } from 'src/shared/domain/value-object';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

type UserEntityProps = {
  id: UUIDValueObject;
  name: string;
  surname?: string;
  email: string;
  password: string;
  isManager: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity extends Entity {
  public readonly id: UUIDValueObject;
  public name: string;
  public surname?: string;
  public email: string;
  public password: string;
  public isManager: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: UserEntityProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.password = props.password;
    this.isManager = props.isManager;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: UserEntityProps): UserEntity {
    return new UserEntity({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
  }

  get entityId(): ValueObject {
    return this.id;
  }
}
