import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, validateSync } from 'class-validator';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';

export type GetUserByIdInputProps = {
  id: string;
};

export class GetUserByIdInput {
  @IsNotEmpty()
  @ApiProperty()
  id: UUIDValueObject;

  constructor(props: GetUserByIdInputProps) {
    if (!props) return;
    this.id = new UUIDValueObject(props.id);
  }
}

export class ValidateGetUserByIdInput {
  static validate(input: GetUserByIdInput) {
    return validateSync(input);
  }
}
