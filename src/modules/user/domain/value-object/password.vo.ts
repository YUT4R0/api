import * as bcrypt from 'bcryptjs';
import { ValueObject } from 'src/shared/domain/value-object';

export class PasswordValueObject extends ValueObject {
  constructor(private readonly hashedPassword: string) {
    super();
  }

  static async create(raw: string, salt: number): Promise<PasswordValueObject> {
    const hashed = await bcrypt.hash(raw, salt);
    return new PasswordValueObject(hashed);
  }

  static fromHashed(hashed: string): PasswordValueObject {
    return new PasswordValueObject(hashed);
  }

  get value(): string {
    return this.hashedPassword;
  }

  async compare(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.hashedPassword);
  }
}
