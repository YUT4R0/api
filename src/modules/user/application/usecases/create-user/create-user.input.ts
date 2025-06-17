import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  validateSync,
} from 'class-validator';

export type CreateUserConstructorProps = {
  name: string;
  surname?: string;
  email: string;
  password: string;
  isManager: boolean;
};

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isManager: boolean;

  constructor(props: CreateUserConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.password = props.password;
    this.isManager = props.isManager;
  }
}

export class ValidateCreateUserInput {
  static validate(input: CreateUserInput) {
    return validateSync(input);
  }
}
