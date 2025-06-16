import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { ValueObject } from '../value-object';

export abstract class UUIDValueObject extends ValueObject {
  private readonly _id: string;

  constructor(id?: string) {
    super();
    this._id = id || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = validateUUID(this._id);
    if (!isValid) throw new Error('invalid ID value');
  }

  get toString(): string {
    return this._id;
  }
}
