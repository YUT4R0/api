import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  validateSync,
} from 'class-validator';
import { UserEntityMutableData } from 'src/modules/user/domain/entity/user.entity';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

export type UpdateUserData = UserEntityMutableData;
export class UpdateUserInput {
  @IsNotEmpty()
  @ApiProperty()
  id: UUIDValueObject;

  @IsString()
  @ApiProperty()
  name?: string;

  @ApiProperty()
  surname?: string;

  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsString()
  @ApiProperty()
  password?: string;

  @IsBoolean()
  @ApiProperty()
  isManager?: boolean;

  constructor(id: string, data: UpdateUserData) {
    if (!data) return;
    this.id = new UUIDValueObject(id);
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.password = data.password;
    this.isManager = data.isManager;
  }
}
export class ValidateUpdateUserInput {
  static validate(input: UpdateUserInput) {
    return validateSync(input);
  }
}
